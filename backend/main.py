from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Database setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/epl_predictions")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database model
class PredictionModel(Base):
    __tablename__ = "predictions"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    display_name = Column(String)
    season = Column(String)
    teams = Column(JSON)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic models
class TeamPrediction(BaseModel):
    position: int
    team: str

class PredictionInput(BaseModel):
    username: str
    display_name: str
    season: str
    teams: List[TeamPrediction]

class PredictionResponse(BaseModel):
    id: int
    username: str
    display_name: str
    season: str
    teams: List[dict]
    
    class Config:
        from_attributes = True

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# FastAPI app
app = FastAPI(title="EPL Predictions API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Create prediction
@app.post("/api/predictions/", response_model=PredictionResponse)
def create_prediction(prediction: PredictionInput, db: Session = Depends(get_db)):
    try:
        # Check if prediction already exists
        existing = db.query(PredictionModel).filter(
            PredictionModel.username == prediction.username
        ).first()
        
        if existing:
            # Update existing prediction
            existing.display_name = prediction.display_name
            existing.season = prediction.season
            existing.teams = [team.dict() for team in prediction.teams]
            db.commit()
            db.refresh(existing)
            return existing
        
        # Create new prediction
        db_prediction = PredictionModel(
            username=prediction.username,
            display_name=prediction.display_name,
            season=prediction.season,
            teams=[team.dict() for team in prediction.teams]
        )
        db.add(db_prediction)
        db.commit()
        db.refresh(db_prediction)
        return db_prediction
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

# Get all predictions
@app.get("/api/predictions/", response_model=List[PredictionResponse])
def get_predictions(db: Session = Depends(get_db)):
    try:
        predictions = db.query(PredictionModel).all()
        return predictions
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Get prediction by username
@app.get("/api/predictions/{username}", response_model=PredictionResponse)
def get_prediction(username: str, db: Session = Depends(get_db)):
    try:
        prediction = db.query(PredictionModel).filter(
            PredictionModel.username == username
        ).first()
        
        if not prediction:
            raise HTTPException(status_code=404, detail="Prediction not found")
        
        return prediction
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Delete prediction
@app.delete("/api/predictions/{username}")
def delete_prediction(username: str, db: Session = Depends(get_db)):
    try:
        prediction = db.query(PredictionModel).filter(
            PredictionModel.username == username
        ).first()
        
        if not prediction:
            raise HTTPException(status_code=404, detail="Prediction not found")
        
        db.delete(prediction)
        db.commit()
        return {"message": "Prediction deleted"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

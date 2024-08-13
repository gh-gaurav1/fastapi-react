from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import sessionlocal,engine
import models
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers = ['*']
    
)

class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    is_income: bool
    date:str

class TransactionModel(TransactionBase):
    id:int
    
    class Config:
        orm_mode = True
        
def get_db():
    db = sessionlocal()
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db:db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction
    

@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int =100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions

@app.get("/")
def read_root():
    return RedirectResponse(url="/docs")



# Explanation:

#Annotated: The Annotated type is a way to add metadata or extra information to a type. 
# It's often used in FastAPI to combine type hints with dependencies, validation, or other metadata.
#Depends: Depends is a FastAPI dependency injection system used
# to declare that a function parameter should be provided by a dependency (in this case, get_db).
#Session: This is the type hint indicating that the db_dependency is expected to be a Session object, 
# which is typically used to interact with the database using SQLAlchemy.
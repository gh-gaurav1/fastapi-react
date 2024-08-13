from sqlalchemy import Boolean, Column, Integer, String, Float
from database import Base

class Transaction(Base):
    __tablename__ = 'transactions'
    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    category = Column(String)
    description = Column(String)
    is_income = Column(Boolean)
    date = Column(String)

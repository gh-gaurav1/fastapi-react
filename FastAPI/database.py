from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

DATABASE_URL =os.getenv('DATABASE_URL','postgresql://postgres:root@localhost:5433/reactfastapi')

engine = create_engine(DATABASE_URL)

sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

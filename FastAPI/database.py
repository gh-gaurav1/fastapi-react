from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

# Use the external database URL provided by Render
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://root:H9lIzsa3Mx5Hiss2i0cH394v2H7O3WY3@dpg-cqtefd2j1k6c738js4m0-a.singapore-postgres.render.com/reactfastapi')

engine = create_engine(DATABASE_URL)

sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

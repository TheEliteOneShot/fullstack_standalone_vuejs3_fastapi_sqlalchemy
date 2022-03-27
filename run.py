from sys import path as syspath
import os
from subprocess import Popen
from config import Config

# Add the local packages directory
current_working_directory = os.getcwd()
dependencies_path = os.path.join(current_working_directory, "dependencies")
try:
    syspath.append(dependencies_path)
except Exception as error:
    print('An error would not add allow module path to be added: ', error)

# SQLAlchemy full documentation: docs.sqlalchemy.org/en/14/tutorial

# Run the frontend (VueJS3)
Popen(['python', '-m', 'http.server', str(Config.FRONTEND_PORT),'--bind', str(Config.FRONTEND_HOST), '--directory', './frontend/'])
# Run the backend (FastAPI with the Uvicorn server)
import uvicorn
uvicorn.run('fastapi_server:app', host=Config.BACKEND_HOST, port=Config.BACKEND_PORT, log_level="info")

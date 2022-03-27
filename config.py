class Config(object):
    # Backend Server
    BACKEND_HOST = "localhost"
    BACKEND_PORT = 5000

    API_TILE = "Example API"
    API_VERSION = 1.0

    NONSENSE_API_PREFIX = "/v1/nonsense"
    STUFF_API_PREFIX= "/v1/stuff"

    # Frontend Server
    FRONTEND_HOST = "127.0.0.1"
    FRONTEND_PORT = 5001

    # CORS
    CORS_ORIGINS = [
    "http://localhost:5000",
    "http://localhost:5001",
    "http://127.0.0.1:5000",
    "http://127.0.0.1:5001",
    ]

    CORS_ALLOW_CREDENTIALS=True
    CORS_ALLOW_METHODS=["*"]
    CORS_ALLOW_HEADERS=["*"]




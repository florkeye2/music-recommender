from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def home():
    return "<h1>Swag</h1>"
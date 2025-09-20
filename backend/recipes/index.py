import json
import os
import psycopg2
from typing import Dict, Any, List

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    API для получения рецептов с фильтрацией и поиском
    Args: event - dict с httpMethod, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response с списком рецептов или ошибкой
    '''
    method: str = event.get('httpMethod', 'GET')
    
    # Обработка CORS OPTIONS
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    # Подключение к базе данных
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database connection not configured'})
        }
    
    try:
        # Параметры запроса
        params = event.get('queryStringParameters') or {}
        search = params.get('search', '').lower()
        category = params.get('category', '')
        
        # Подключение к БД
        conn = psycopg2.connect(database_url)
        cursor = conn.cursor()
        
        # Базовый SQL запрос
        sql = "SELECT id, name, calories, protein, carbs, fat, cook_time, category, ingredients, instructions FROM recipes WHERE 1=1"
        query_params = []
        
        # Добавление фильтров
        if search:
            sql += " AND LOWER(name) LIKE %s"
            query_params.append(f"%{search}%")
        
        if category and category != 'Все':
            sql += " AND category = %s"
            query_params.append(category)
        
        sql += " ORDER BY name"
        
        # Выполнение запроса (простой протокол)
        if query_params:
            # Форматирование для простого протокола
            formatted_sql = sql
            for param in query_params:
                formatted_sql = formatted_sql.replace('%s', f"'{param}'", 1)
            cursor.execute(formatted_sql)
        else:
            cursor.execute(sql)
        rows = cursor.fetchall()
        
        # Формирование результата
        recipes = []
        for row in rows:
            recipe = {
                'id': row[0],
                'name': row[1],
                'calories': row[2],
                'protein': row[3],
                'carbs': row[4],
                'fat': row[5],
                'cookTime': row[6],
                'category': row[7],
                'ingredients': row[8],
                'instructions': row[9]
            }
            recipes.append(recipe)
        
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'recipes': recipes})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': f'Database error: {str(e)}'})
        }
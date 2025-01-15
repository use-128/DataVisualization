import sqlite3
# 连接到SQLite数据库
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# 创建一个表（如果不存在）
cursor.execute('''
    CREATE TABLE IF NOT EXISTS bar_data (
        id INTEGER PRIMARY KEY,
        category TEXT NOT NULL,
        sales INTEGER NOT NULL
    )
''')

# 插入一些示例数据
cursor.executemany('INSERT INTO bar_data (category, sales) VALUES (?, ?)', [
    ('Category 1', 100),
    ('Category 2', 200),
    ('Category 3', 150),
])

# 提交更改并关闭连接
conn.commit()
conn.close()
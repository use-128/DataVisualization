from flask import Flask, jsonify
from flask_cors import CORS  # 导入CORS
import sqlite3



# 创建Flask应用实例
app = Flask(__name__)

# 启用CORS
# CORS(app)  # 这将允许所有源的请求
CORS(app, origins='http://127.0.0.1:5500')

# 定义路由和视图函数
@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/api/bar_data')
def get_data():
    """
    从SQLite数据库中读取数据，并将其转换为JSON格式返回。

    :return: 一个JSON格式的响应，包含从数据库中读取的数据。
    """
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 查询数据
    cursor.execute('SELECT category, sales FROM bar_data')
    rows = cursor.fetchall()

    # 将数据转换为字典列表
    data = {'categories': [row[0] for row in rows], 'sales': [row[1] for row in rows]}

    # 关闭连接
    conn.close()

    return jsonify(data)

@app.route('/api/line_bar_data')
def get_line_bar_data():
    """
    从SQLite数据库中读取数据，并将其转换为JSON格式返回。

    :return: 一个JSON格式的响应，包含从数据库中读取的数据。
    """
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    # 查询数据
    cursor.execute('SELECT category, value FROM line_bar_data')
    rows = cursor.fetchall()
    # 将数据转换为字典列表
    data = {'categories': [row[0] for row in rows],'values': [row[1] for row in rows]}
    print(data)
    # 关闭连接
    conn.close()
    return jsonify(data)

# 启动应用
if __name__ == '__main__':
    app.run(debug=True)

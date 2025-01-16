import schedule
import time
import requests
import sqlite3


def spider_task():
    """
    爬虫任务函数，用于从天气API获取数据并存储到数据库中。
    """
    print("开始执行爬虫任务...")
    city_list = ['长沙','岳阳','常德','郴州','衡阳','怀化','娄底','邵阳','湘西','益阳','永州','张家界','株洲','湘潭']
    data = []
    # {"nums":8,"cityid":"101251001","city":"岳阳","date":"2025-01-16","week":"星期四",
    # "update_time":"00:01","wea":"晴","wea_img":"qing","tem":"7.2","tem_day":"13",
    # "tem_night":"3","win":"东北风","win_speed":"1级","win_meter":"3km\/h","air":"118","pressure":"1023","humidity":"43%"}
    try:
        # 遍历城列表，获取每个城的天气数据
        for city in city_list:
            # 构建API请求URL，替换城名称
            url = f"http://v1.yiketianqi.com/free/day?appid=48571297&appsecret=QK5oNsHf&unescape=1&unescape=1&city={city.replace('', '')}"
            # 发送GET请求获取天气数据
            response = requests.get(url)
            # 将响应数据解析为JSON格式
            res_data = response.json()
            # 将需要的数据提取并添加到data列表中
            data.append((
                res_data['date'],
                res_data['city'],
                res_data['wea'],
                res_data['tem_day'],
                res_data['tem_night'],
                res_data['tem'],
                res_data['update_time']
            ))
            print(f'{res_data["city"]}爬取完成')
        print("爬虫任务完成。")
    except Exception as e:
        # 捕获并打印异常信息
        print(f"爬虫任务出错: {e}")

    try:
        # 连接到SQLite数据库
        conn = sqlite3.connect('database.db')
        # 创建游标对象
        cursor = conn.cursor()

        # 清空weather表中的数据
        cursor.execute('DELETE FROM weather')
        # 插入数据到weather表中
        cursor.executemany('INSERT INTO weather (date, city,weather, max_tem, min_tem, tem, update_time) VALUES (?, ?, ?, ?, ?, ?, ?)', data)
        # 提交事务
        conn.commit()
        # 关闭数据库连接
        conn.close()
    except Exception as e:
        # 捕获并打印异常信息
        print(f"数据库出错: {e}")


def main():
    # 调度任务在每天凌晨 6 点执行
    schedule.every().day.at("06:00").do(spider_task)
    # 调度任务在每天中午 12 点执行
    schedule.every().day.at("12:00").do(spider_task)
    # 调度任务在每天晚上 6 点（18:00）执行
    schedule.every().day.at("18:00").do(spider_task)

    while True:
        # 检查是否有任务需要执行
        schedule.run_pending()
        # 休眠 1 秒，避免 CPU 占用过高
        time.sleep(60)



if __name__ == "__main__":
    main()
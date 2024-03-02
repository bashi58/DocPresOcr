import sqlite3
connection=sqlite3.connect('app.db')
temp=connection.cursor()
users_info="CREATE TABLE users (userid INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(25),email VARCHAR(40),phone VARCHAR(10),password VARCHAR(20));"
temp.execute(users_info)
connection.commit()
connection.close()
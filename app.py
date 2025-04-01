from flask import Flask, request, render_template
import json
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/log-visitor', methods=['POST'])
def log_visitor():
    data = request.get_json()

    # تأكد من وجود ملف
    if not os.path.exists('visitors_log.json'):
        with open('visitors_log.json', 'w') as f:
            f.write("")

    # نسجّل كل زيارة في سطر منفصل
    with open('visitors_log.json', 'a', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False) + '\n')

    return '', 204

if __name__ == '__main__':
    app.run(debug=True)

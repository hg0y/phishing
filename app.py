from flask import Flask, request, render_template
import json
import os
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/log-visitor', methods=['POST'])
def log_visitor():
    data = request.get_json()

    # جلب IP ومعلومات الموقع من السيرفر بدل الجافاسكربت
    try:
        ip_data = requests.get('https://ipapi.co/json/').json()
        data['public_ip'] = ip_data.get('ip', 'غير معروف')
        data['city'] = ip_data.get('city', 'غير معروف')
        data['region'] = ip_data.get('region', 'غير معروف')
        data['country'] = ip_data.get('country_name', 'غير معروف')
    except:
        data['public_ip'] = 'غير متوفر'
        data['city'] = 'غير متوفر'
        data['region'] = 'غير متوفر'
        data['country'] = 'غير متوفر'

    # إنشاء ملف إذا ما كان موجود
    if not os.path.exists('visitors_log.json'):
        with open('visitors_log.json', 'w') as f:
            f.write("")

    # تسجيل الزيارة
    with open('visitors_log.json', 'a', encoding='utf-8') as f:
        f.write(json.dumps(data, ensure_ascii=False) + '\n')

    return '', 204

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

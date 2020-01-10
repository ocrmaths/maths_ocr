from flask import Flask, Blueprint, current_app
from flask_restplus import Api,Resource, fields,reqparse
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__,static_url_path='/static')
blueprint = Blueprint('api',__name__,url_prefix='/api')
api = Api(blueprint, title='MATHS OCR',description="API's related to OCR Project",doc="/documentation") # To disbale swagger visibility we use -> (doc=False)
ns_conf = api.namespace('OCR', description='API operations')
app.config['SWAGGER_UI_JSONEDITOR'] = True
app.register_blueprint(blueprint)
app.logger.info('testing info log')
# API Models
from resources.read_inputs import *

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=False,port=5005)


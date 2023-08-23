from flask import Flask,render_template,request,jsonify
from image_process import process_img
import numpy as np
import matplotlib.pyplot as plt
import json


my_app=Flask(__name__)


@my_app.route('/',methods=['GET','POST'])
def home_page():
    #return render_template('front_end.html',lnk=res)
    return render_template('front_end.html')

@my_app.route('/predict',methods=['POST'])
def page2():
    prediction=0
    if request.method=='POST':
        #print('client sent something')
        data=list(request.get_data())
        data=np.reshape(data,(500,500,-1))
        prediction=process_img(data)
        return jsonify({'digit':str(prediction)})
    

if __name__=='__main__':
    my_app.run(debug=True)

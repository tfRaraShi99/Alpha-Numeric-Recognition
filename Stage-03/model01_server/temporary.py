from tensorflow import image,io
import numpy as np
import json
import tensorflow as tf
import requests as rq

MODEL_PATH='http://localhost:8501/v1/models/lenet_argmax01:predict'
(x_train,y_train),(x_test,y_test)=tf.keras.datasets.mnist.load_data()


def process_img(img):
    # #img=tf.image.rgb_to_grayscale(img[:,:,:3])
    # img=tf.image.resize(img,(28,28))
    # img=tf.expand_dims(img,0)
    # #print(img.shape)
    obj={"instances":x_test[:6][...,np.newaxis].tolist()} 
    json_obj=json.dumps(obj)
    res=rq.post(MODEL_PATH,data=json_obj)
    print(res.text)
    #print(res)
    return res
    
    
if __name__=='__main__':
    data=np.ones((1,28,28,1))
    print(process_img(data))
from tensorflow import image,io
import numpy as np
import json
import tensorflow as tf
import requests as rq

#if we apply the concept of class then this required
#from tensorflow.python.ops.numpy_ops import np_config
#np_config.enable_numpy_behaviour()

MODEL_PATH='http://localhost:8501/v1/models/lenet:predict'
#from urllib.request import urlopen

# formats=list(map(bytes,['BMP','JPG','JFIF','PNG','RAW'],['utf-8']*5))+[b'\xff\xd8']
# codecs={b'BMP':io.decode_bmp,
#         b'JPG':io.decode_jpeg,
#         b'JFIF':io.decode_jpeg,
#         b'PNG':io.decode_png,
#         b'RAW':io.decode_raw,
#         b'\xff\xd8':io.decode_jpeg
#        }

# def process_img(data):
#     #try:
#         img=data.read()
#         for format in formats:
#             if format in img:
#                 print("format not found")
#                 img=codecs[format](img,channels=1)
#                 image=io.encode_jpeg(img)
#                 io.write_file('./static/image.jpeg',image)
#                 img=tf.image.resize(img,(28,28))
#                 img=tf.expand_dims(img,0)
#                 print(img.shape)
#                 res=model(img)
#                 return tf.argmax(res,1).numpy()[0]
#             print('format not found')
            
#     #except:
#         #return "Error"
def process_img(img):
    img=tf.image.rgb_to_grayscale(img[:,:,:3])
    img=tf.image.resize(img,(28,28))
    img=tf.expand_dims(img,0)
    #print(img.shape)
    obj={"instances":img.numpy().tolist()} 
    json_obj=json.dumps(obj)
    res=rq.post(MODEL_PATH,data=json_obj)
    res=json.loads(res.text)['predictions']
    #print(res)
    return tf.argmax(res,1).numpy()[0]
    
    
if __name__=='__main__':
    data=[]
    print(process_img(data))
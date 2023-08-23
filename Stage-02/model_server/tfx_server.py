import requests as rq
import tensorflow as tf
import json
import numpy as np
(x_train,y_train),(x_test,y_test)=tf.keras.datasets.mnist.load_data()
#x_test=np.expand_dims(x_test[:],axis=0)
#x_test=x_test.reshape(x_test.shape[0],28,28,1)
x_test=np.expand_dims(x_test[:],axis=-1)

#print(x_test.shape)
#tolist converts np array to list
obj={"instances":x_test[:10].tolist()} 
json_obj=json.dumps(obj)

# #response=rq.get('http://localhost:8501/v1/models/lenet')
# #response=rq.get('http://localhost:8501/v1/models/lenet/metadata',data=json_obj)
response=rq.post('http://localhost:8501/v1/models/lenet:predict',data=json_obj)
#print(response.text)

predictions = json.loads(response.text)['predictions']
#print(predictions)


#comparing the model prediction with y_test:
print(y_test[:10])


for i in range(0,10):
    print(np.argmax(predictions[i]))





# print(type(x_test))
# print(type(obj))
# print(type(json_obj))
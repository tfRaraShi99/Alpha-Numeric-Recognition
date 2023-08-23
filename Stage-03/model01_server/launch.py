import os
from threading import Thread

TFX_PORT=8501
FLASK_PORT=5000

TFX_DOMAIN="trishnatfx01"
FLASK_DOMAIN="sutrishnaweb01"



def launch_tfx():
    os.system("bash protoconfig.sh")
    while(1):pass



def launch_flask():
    os.system("python server.py")
    while(1):pass




def tunnel_tfx():
    os.system("lt -p {} -s {}".format(TFX_PORT,TFX_DOMAIN))
    while(1):pass



def tunnel_flask():
    os.system("lt -p {} -s {}".format(FLASK_PORT,FLASK_DOMAIN))
    while(1):pass



registered_task=[launch_tfx,
                
                tunnel_tfx,
                
                launch_flask,
                tunnel_flask]

if __name__=='__main__':
    def launch_task(task):
        task_thread=Thread(target=task)
        task_thread.start()
        return task_thread
    tasks=list(map(launch_task,registered_task))
    for task in tasks:
        task.join()


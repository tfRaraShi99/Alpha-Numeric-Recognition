MODEL_PATH="lenet_argmax01"
MODEL_NAME="lenet_argmax01"
REST_PORT=8501
tensorflow_model_server    --rest_api_port=$REST_PORT      \
                           --model_base_path=$(pwd)/$MODEL_PATH \
                           --model_name=$MODEL_NAME \
                           --rest_api_enable_cors_support=true
                        
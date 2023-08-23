MODEL_PATH="lenet5"
MODEL_NAME="lenet"
REST_PORT=8501
tensorflow_model_server    --rest_api_port=$REST_PORT      \
                           --model_base_path=$(pwd)/$MODEL_PATH \
                           --model_name=$MODEL_NAME
                        
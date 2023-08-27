REST_PORT=8501
tensorflow_model_server    --rest_api_port=$REST_PORT      \
                           --model_config_file="model.proto" \
                           --rest_api_enable_cors_support=true
                           --model_config_file_poll_wait_seconds=0.3
                        

    


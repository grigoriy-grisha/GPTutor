import io
import os

import numpy as np
import pandas as pd
import requests
from keras.src.applications import VGG16
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing import image

base_model = VGG16(weights='imagenet', include_top=False, input_shape=(80, 80, 3))

model = Sequential()
model.add(Dense(1024, activation='relu', input_shape=(2048,)))
model.add(Dropout(0.5))
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(3, activation='softmax'))

model.load_weights(os.path.abspath("nsfwdetector/models/weight_80_36000.hdf5"))

model.compile(loss='categorical_crossentropy', optimizer='Adam', metrics=['accuracy'])


def predict_if_safe(image_url):
    response = requests.get(image_url)

    prediction_images = []
    img = image.load_img(io.BytesIO(response.content), target_size=(80, 80, 3))
    img = image.img_to_array(img)
    img = img / 255
    prediction_images.append(img)

    # converting all the images into numpy array
    prediction_images = np.array(prediction_images)
    # extracting features using pre-trained model
    prediction_images = base_model.predict(prediction_images)
    # converting features in one dimensional array
    prediction_images = prediction_images.reshape(prediction_images.shape[0], 2 * 2 * 512)
    # predicting tags for each array
    predict = model.predict(prediction_images)
    predict = np.argmax(predict, axis=1)

    train = pd.read_csv(os.path.abspath("nsfwdetector/train_new.csv"))
    y = train['class']
    y = pd.get_dummies(y)
    res = y.columns.values[predict][0]

    return str(res)

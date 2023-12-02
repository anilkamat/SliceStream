from segment_anything import SamAutomaticMaskGenerator, SamPredictor, sam_model_registry
import numpy as np
import matplotlib.pyplot as plt
import cv2
import tkinter
import torch
import time


import sys
sys.path.append("..")

def show_mask(mask, ax, random_color=False):
    if random_color:
        color = np.concatenate([np.random.random(3), np.array([0.6])], axis=0)
    else:
        color = np.array([30/255, 144/255, 255/255, 0.6])
    h, w = mask.shape[-2:]
    mask_image = mask.reshape(h, w, 1) * color.reshape(1, 1, -1)
    ax.imshow(mask_image)
    
def show_points(coords, labels, ax, marker_size=375):
    pos_points = coords[labels==1]
    neg_points = coords[labels==0]
    ax.scatter(pos_points[:, 0], pos_points[:, 1], color='green', marker='*', s=marker_size, edgecolor='white', linewidth=1.25)
    ax.scatter(neg_points[:, 0], neg_points[:, 1], color='red', marker='*', s=marker_size, edgecolor='white', linewidth=1.25)   
    
def show_box(box, ax):
    x0, y0 = box[0], box[1]
    w, h = box[2] - box[0], box[3] - box[1]
    ax.add_patch(plt.Rectangle((x0, y0), w, h, edgecolor='green', facecolor=(0,0,0,0), lw=2))

def apply_anns(anns):
    if len(anns) == 0:
        return
    sorted_anns = sorted(anns, key=(lambda x: x['area']), reverse=True)
    ax = plt.gca()
    ax.set_autoscale_on(False)

    img = np.ones((sorted_anns[0]['segmentation'].shape[0], sorted_anns[0]['segmentation'].shape[1], 4))
    img[:,:,3] = 0
    for ann in sorted_anns:
        m = ann['segmentation']
        color_mask = np.concatenate([np.random.random(3), [0.35]])
        img[m] = color_mask
    ax.imshow(img)
    return (ax, img)

def show_anns(anns):
    if len(anns) == 0:
        return
    ax, img = apply_anns(anns)
    ax.imshow(img)
    



#
# Load the model
#
checkpoint_path = "./models/sam_vit_h_4b8939.pth"
model_type = "vit_h"

sam = sam_model_registry[model_type](checkpoint=checkpoint_path)
mask_generator = SamAutomaticMaskGenerator(sam)

#
# Set up the server for React to communicate with
#

import os
from flask import Flask, request, render_template, send_file
from flask_cors import CORS
import requests

from flask_socketio import SocketIO, emit

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        # "http://actual-app-url.herokuapp.com",
        # "https://actual-app-url.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)


app = Flask(__name__)
CORS(app)

# import your socketio object (with the other imports at the
# top of the file)
# in this example, the file from the previous step is named socket.py


# initialize the app with the socket instance
# you could include this line right after Migrate(app, db)
socketio.init_app(app)

@app.route('/upload', methods=['POST'])
def handle_form():
    should_process = True

    print(request)
    file = request.files['file']
    print("Posted file: {}".format(file))
    print("Type:", type(file))
    # print("Keys:")
    # print(file

    # image = cv2.imread(file)
    
    if should_process:
        # convert string of image data to uint8
        nparr = np.frombuffer(file.read(), np.uint8)
        print(nparr)
        # decode image
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        output = {}
        new_file = "a"

        print("Generating masks...")
        start = time.time()
        masks = mask_generator.generate(image)
        end = time.time()
        print("Masks generated!")
        print("Time Taken: {:.10f} seconds".format(end - start))

        # print(masks)

        # plt.figure(figsize=(20,20))
        # print("marker 1")
        # plt.imshow(image)
        # print("marker 2")
        # show_anns(masks)
        # print("marker 3")
        # plt.axis('off')
        # print("marker 4")
        # plt.savefig("test_export2.png")
        # plt.show() 

        print("Displaying image with masks...")

    figure = plt.figure(figsize=(20,20))
    plt.imshow(image)

    if should_process:
        ax, img = apply_anns(masks)
        plt.axis('off')
        # plt.show() 
        print("Image with masks displayed!")
        # plt.imsave("test_app_export.png", image)
        # ax.imsave("test_app_export2.png", img)
        # figure.add_axes(ax)
    
    plt.savefig("test_export3.png")
    
    # plt.imsave("test_app_export2.png", figure)
    print("Image saved!")
    # plt.show()

    # ax.imshow(your_image, aspect='auto')
    # plt.imsave("test_app_export2.png", img)

    # import matplotlib.pyplot as plt
    # fig = plt.figure(dpi=100, tight_layout=True, frameon=False, figsize=(resolution/100.,resolution/100.)) # dpi & figsize of my choosing
    # fig.figimage(ARRAY, cmap=plt.cm.binary)
    # fig.text(X,Y,TEXT, size='medium', backgroundcolor='white', alpha=0.5)
    # plt.savefig(FILENAME)
    # plt.close(fig)

    return send_file('./test_export3.png')

    # return output

@app.route("/")
def index():
    return render_template("index.html");   

# at the bottom of the file, use this to run the app
if __name__ == "__main__":
    app.run(host='localhost', port=8000, debug=True)
    socketio.run(app)

# image_path = "./images/car.jpg"

# image = cv2.imread(image_path)

# print("Generating masks...")
# masks = mask_generator.generate(image)
# print("Masks generated!")

# print(masks)

# print("Displaying image with masks...")
# plt.figure(figsize=(20,20))
# plt.imshow(image)
# show_anns(masks)
# plt.axis('off')
# plt.show() 
# print("Image with masks displayed!")
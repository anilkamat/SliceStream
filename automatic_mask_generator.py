from segment_anything import SamAutomaticMaskGenerator, sam_model_registry
import numpy as np
import matplotlib.pyplot as plt
import cv2
import tkinter
import time

def show_anns(anns):
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

checkpoint_path = "./models/sam_vit_h_4b8939.pth"
image_path = "./images/car.jpg"
image_path = "./images/image3.png"
model_type = "vit_h"

image = cv2.imread(image_path)

sam = sam_model_registry[model_type](checkpoint=checkpoint_path)
mask_generator = SamAutomaticMaskGenerator(sam)

print("Generating masks...")
start = time.time()
masks = mask_generator.generate(image)
end = time.time()
print("Masks generated!")
print("Time Taken: {:.10f} seconds".format(end - start))

# print(masks)

print("Displaying image with masks...")
plt.figure(figsize=(20,20))
plt.imshow(image)
show_anns(masks)
plt.axis('off')
plt.show() 
print("Image with masks displayed!")
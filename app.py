from segment_anything import SamAutomaticMaskGenerator, sam_model_registry
import cv2

checkpoint_path = "./models/sam_vit_h_4b8939.pth"
image_path = "./images/car.jpg"
model_type = "vit_h"

image = cv2.imread(image_path)

sam = sam_model_registry[model_type](checkpoint=checkpoint_path)
mask_generator = SamAutomaticMaskGenerator(sam)
masks = mask_generator.generate(image)

print(masks)
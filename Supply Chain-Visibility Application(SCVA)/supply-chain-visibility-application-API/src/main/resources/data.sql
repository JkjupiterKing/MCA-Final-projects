--two users are created by default, other new users will be created using Register option
insert into USERS(username, email,password,address,phone_number) VALUES 
('john','john@apple.com','YQ==','Mysore','1234567890'),
('peter','peter@gmail.com','YQ==','Mangalore','1234567899');

-- Insert initial records into customerorders table
INSERT INTO customerorders (customer_name, product_name, status) VALUES
    ('john', 'Smartphone', 'Shipped'),
    ('john', 'Laptop', 'Processing'),
    ('john', 'Samsung TV', 'Processing'),
    ('john', 'Tablet', 'Delivered'),
    ('john', 'Smartwatch', 'Pending'),
    ('peter', 'Headphones', 'Shipped'),
    ('peter', 'Bluetooth Speaker', 'Pending'),
    ('peter', 'Camera', 'Processing'),
    ('peter', 'Mobile', 'Delivered');

INSERT INTO purchaseorders (item, quantity, supplier, price) VALUES
    ('Laptop', 2, 'ABC Suppliers', 20000),
    ('Printer', 1, 'XYZ Suppliers', 10000),
    ('Monitor', 3, 'Tech Solutions', 15000),
    ('Keyboard', 5, 'E-Commerce Supply', 5000),
    ('Mouse', 10, 'Tech Hub', 2500),
    ('Desk', 1, 'Office Furnishings Inc.', 12000),
    ('Chair', 2, 'Comfort Seating', 8000),
    ('Projector', 1, 'Audio Visual Tech', 30000),
    ('Scanner', 3, 'Digitize IT', 7000),
    ('External Hard Drive', 4, 'Storage Solutions Ltd.', 4000),
    ('Office Software Suite', 1, 'Software Solutions Co.', 15000),
    ('Printer Ink Cartridges (Set)', 2, 'Print Supplies Depot', 3000);

INSERT INTO supplier (name, contact_person, email, phone, address)
VALUES
    ('ABC Suppliers', 'John Doe', 'john.doe@example.com', '123-456-7890', '123 Supplier St, City, Country'),
    ('XYZ Suppliers', 'Jane Smith', 'jane.smith@example.com', '987-654-3210', '456 Supplier Ave, Town, Country'),
    ('Tech Solutions', 'Mike Johnson', 'mike.johnson@example.com', '555-123-4567', '789 Supplier Rd, Village, Country'),
    ('E-Commerce Supply', 'Sarah Brown', 'sarah.brown@example.com', '111-222-3333', '321 Supplier Blvd, Hamlet, Country'),
    ('Tech Hub', 'David Lee', 'david.lee@example.com', '444-555-6666', '567 Supplier Ln, City, Country'),
    ('Office Furnishings Inc.', 'Emily White', 'emily.white@example.com', '777-888-9999', '987 Supplier Way, Town, Country'),
    ('Comfort Seating', 'Michael Smith', 'michael.smith@example.com', '222-333-4444', '654 Supplier Ave, City, Country'),
    ('Audio Visual Tech', 'Jessica Green', 'jessica.green@example.com', '999-888-7777', '789 Supplier St, Village, Country'),
    ('Digitize IT', 'Kevin Davis', 'kevin.davis@example.com', '123-987-6543', '432 Supplier Rd, Hamlet, Country'),
    ('Storage Solutions Ltd.', 'Rachel Wilson', 'rachel.wilson@example.com', '654-321-9876', '876 Supplier Blvd, Town, Country'),
    ('Software Solutions Co.', 'Anna Carter', 'anna.carter@greentech.com', '321-654-9870', '101 Green St, Eco City, Country'),
    ('Print Supplies Depot', 'Brian Lee', 'brian.lee@gadgetworld.com', '222-333-4444', '202 Gadget Blvd, Tech Town, Country');

INSERT INTO stockkeepingunit (stock_name, description, price, stock_quantity, created_at, updated_at) VALUES
    ('John Hardy Women''s Gold & Silver Dragon Station Chain Bracelet', 'Wear inward for love and abundance or outward for protection.', 695.00, 100, '2024-07-09 10:00:00', '2024-07-09 10:00:00'),
    ('Solid Gold Petite Micropave', 'Satisfaction guaranteed. Return or exchange within 30 days. Designed and sold in the US.', 168.00, 150, '2024-07-09 10:30:00', '2024-07-09 10:30:00'),
    ('White Gold Plated Princess', 'Classic wedding engagement solitaire ring. Ideal for engagement, wedding, or anniversaries.', 9.99, 75, '2024-07-09 11:00:00', '2024-07-09 11:00:00'),
    ('WD 2TB Elements Portable External Hard Drive - USB 3.0', 'USB 3.0 and 2.0 compatibility. Fast data transfers. High capacity. NTFS formatted for Windows.', 64.00, 200, '2024-07-09 11:30:00', '2024-07-09 11:30:00'),
    ('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 'Easy upgrade for faster boot-up and application load. Read/write speeds up to 535MB/s/450MB/s.', 109.00, 150, '2024-07-09 12:00:00', '2024-07-09 12:00:00'),
    ('Silicon Power 256GB SSD 3D NAND A55', 'High transfer speeds, SLC Cache Technology, slim design. Supports TRIM and RAID for optimized performance.', 109.00, 120, '2024-07-09 12:30:00', '2024-07-09 12:30:00'),
    ('Mens Casual Premium Slim Fit T-Shirts', 'Slim-fit style with contrast sleeves and three-button placket. Soft, durable, and great for casual wear.', 22.30, 90, '2024-07-09 13:00:00', '2024-07-09 13:00:00'),
    ('Mens Cotton Jacket', 'Great for Spring/Autumn/Winter. Suitable for outdoor activities. A good gift for family.', 55.99, 180, '2024-07-09 13:30:00', '2024-07-09 13:30:00'),
    ('Mens Casual Slim Fit', 'Color may vary slightly from screen. Detailed size information available in the product description.', 15.99, 150, '2024-07-09 14:00:00', '2024-07-09 14:00:00'),
    ('Pierced Owl Rose Gold Plated Stainless Steel Double', 'Rose gold-plated double flared tunnel plug earrings. Made of stainless steel.', 10.99, 100, '2024-07-09 14:30:00', '2024-07-09 14:30:00'),
    ('BIYLACLESEN Women''s 3-in-1 Snowboard Jacket', '100% polyester with detachable liner. Adjustable hood and cuffs, multiple pockets.', 56.99, 200, '2024-07-09 15:00:00', '2024-07-09 15:00:00'),
    ('Lock and Love Women''s Removable Hooded Leather Moto Jacket', 'Faux leather jacket with removable hood. Includes front pockets. Hand wash only.', 29.95, 100, '2024-07-09 15:30:00', '2024-07-09 15:30:00'),
    ('WD 4TB Gaming Drive for PS4', 'Expand your PS4 gaming experience. Fast setup and high capacity. 3-year warranty.', 114.00, 150, '2024-07-09 16:00:00', '2024-07-09 16:00:00'),
    ('Acer SB220Q bi 21.5 inches Full HD IPS Monitor', '21.5" Full HD widescreen IPS display with 75Hz refresh rate. Ultra-thin design.', 599.00, 80, '2024-07-09 16:30:00', '2024-07-09 16:30:00'),
    ('Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor', '49" ultrawide curved monitor with QLED technology. 144Hz refresh rate and 1ms response time.', 1399.00, 100, '2024-07-09 17:00:00', '2024-07-09 17:00:00');


INSERT INTO Products (title, price, description, category, ImageURL, rating) VALUES
('John Hardy Women''s Gold & Silver Dragon Station Chain Bracelet', 695.00, 'Wear facing inward to be bestowed with love and abundance, or outward for protection.', 'jewelery', '/../../resources/image/products/Image1.jpg', '4.6'),
('Solid Gold Petite Micropave', 168.00, 'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.', 'jewelery', '/../../resources/image/products/Image2.jpg', '3.9'),
('White Gold Plated Princess', 9.99, 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine''s Day...', 'jewelery', '/../../resources/image/products/Image3.jpg', '3.0'),
('WD 2TB Elements Portable External Hard Drive - USB 3.0', 64.00, 'USB 3.0 and USB 2.0 Compatibility. Fast data transfers. Improve PC Performance. High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system.', 'electronics', '/../../resources/image/products/Image5.jpg', '3.3'),
('SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s', 109.00, 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores). Boosts burst write performance, making it ideal for typical PC workloads. The perfect balance of performance and reliability. Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)', 'electronics', '/../../resources/image/products/Image7.jpg', '2.9'),
('Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5', 109.00, '3D NAND flash is applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan. 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide optimized performance and enhanced reliability.', 'electronics', '/../../resources/image/products/Image8.jpg', '4.8'),
('Mens Casual Premium Slim Fit T-Shirts', 22.30, 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, lightweight & soft fabric for breathable and comfortable wearing. Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.', 'fashion', '/../../resources/image/products/Image18.jpg', '4.1'),
('Mens Cotton Jacket', 55.99, 'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.', 'fashion', '/../../resources/image/products/Image16.jpg', '4.7'),
('Mens Casual Slim Fit', 15.99, 'The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.', 'fashion', '/../../resources/image/products/Image15.jpg', '2.1'),
('Pierced Owl Rose Gold Plated Stainless Steel Double', 10.99, 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel.', 'jewelery', '/../../resources/image/products/Image4.jpg', '1.9'),
('BIYLACLESEN Women''s 3-in-1 Snowboard Jacket Winter Coats', 56.99, '100% Polyester; Detachable Liner Fabric, Skin Friendly, Lightweight and Warm. Stand Collar Liner jacket. 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest and 1 Hidden Pocket Inside. Zippered Hand Pockets and Hidden Pocket keep your things secure. Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water, for a comfortable fit. 3 in 1 Detachable Design provide more convenience.', 'fashion', '/../../resources/image/products/Image20.jpg', '2.6'),
('Lock and Love Women''s Removable Hooded Leather Moto Biker Jacket', 29.95, '100% POLYURETHANE (shell), 100% POLYESTER (lining), 75% POLYESTER 25% COTTON (sweater). Faux leather material for style and comfort. 2 front pockets, 2-For-One Hooded denim style faux leather jacket, Button detail on waist. Detail stitching at sides. HAND WASH ONLY. DO NOT BLEACH. LINE DRY. DO NOT IRON.', 'fashion', '/../../resources/image/products/Image12.jpg', '2.9'),
('WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive', 114.00, 'Expand your PS4 gaming experience, Play anywhere. Fast and easy setup. Sleek design with high capacity. 3-year manufacturer''s limited warranty.', 'electronics', '/../../resources/image/products/Image6.jpg', '4.8'),
('Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin', 599.00, '21.5 inches Full HD (1920 x 1080) widescreen IPS display and Radeon FreeSync technology. No compatibility for VESA Mount. Refresh Rate: 75Hz - Using HDMI port. Zero-frame design | ultra-thin | 4ms response time | IPS panel. Aspect ratio - 16:9. Color Supported - 16.7 million colors. Brightness - 250 nit. Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree. 75 Hz.', 'electronics', '/../../resources/image/products/Image9.jpg', '2.9'),
('Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED', 999.99, '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screens side by side. QUANTUM DOT (QLED) TECHNOLOGY, HDR support, and factory calibration provide stunningly realistic and accurate color and contrast. 144HZ HIGH REFRESH RATE and 1ms ultra-fast response time work to eliminate motion blur, ghosting, and reduce input lag.', 'electronics', '/../../resources/image/products/Image10.jpg', '2.2'),
('Rain Jacket Women Windbreaker Striped Climbing Raincoats', 39.99, 'Lightweight, perfect for trips or casual wear. Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully striped lined, and the raincoat has 2 side pockets that are a good size to hold all kinds of things.', 'fashion', '/../../resources/image/products/Image17.jpg', '3.8'),
('MBJ Womens Solid Short Sleeve Boat Neck', 9.85, '95% RAYON, 5% SPANDEX. Made in USA or Imported. Do Not Bleach. Lightweight fabric with great stretch for comfort. Ribbed on sleeves and neckline. Double stitching on bottom hem.', 'fashion', '/../../resources/image/products/Image13.jpg', '4.7'),
('Opna Womens Short Sleeve Moisture', 7.95, '100% Polyester. Machine wash. 100% cationic polyester interlock. Machine Wash & Pre-Shrunk for a Great Fit. Lightweight, roomy, and highly breathable with moisture-wicking fabric which helps to keep moisture away. Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit delivers a sleek, more feminine silhouette and Added Comfort.', 'fashion', '/../../resources/image/products/Image14.jpg', '4.5'),
('DANVOUY Womens T Shirt Casual Cotton Short', 12.99, '95% Cotton, 5% Spandex. Features: Casual, Short Sleeve, Letter Print, V-Neck, Fashion Tees. The fabric is soft and has some stretch.', 'fashion', '/../../resources/image/products/Image19.jpg', '3.6'),
('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops', 109.95, 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve.', 'fashion', '/../../resources/image/products/Image11.jpg', '3.9');

--ALTER SEQUENCE customerorders_seq RESTART WITH 12;

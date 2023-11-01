-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: picatso
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `country` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Whiskas','Argentina'),(2,'Natura','Argentina'),(3,'Felix','Argentina'),(4,'Royal Canin','Argentina'),(5,'Sabrositos','Argentina'),(6,'Catpro','Argentina'),(8,'Pet & Fish','Argentina'),(9,'Helena.cats','Argentina'),(10,'Zootec','Argentina');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Alimentos'),(2,'Accesorios'),(3,'Higiene');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `date_purchase` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_invoices`
--

DROP TABLE IF EXISTS `item_invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_invoices` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `unit_price` double(6,2) NOT NULL,
  `quantity` int(2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `item_invoices_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`),
  CONSTRAINT `item_invoices_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_invoices`
--

LOCK TABLES `item_invoices` WRITE;
/*!40000 ALTER TABLE `item_invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lifestages`
--

DROP TABLE IF EXISTS `lifestages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lifestages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `stagename` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lifestages`
--

LOCK TABLES `lifestages` WRITE;
/*!40000 ALTER TABLE `lifestages` DISABLE KEYS */;
INSERT INTO `lifestages` VALUES (1,'Bebé'),(2,'Joven'),(3,'Adulto'),(4,'Senior');
/*!40000 ALTER TABLE `lifestages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `product_id` bigint(20) NOT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`product_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,1),(2,1),(3,1),(4,1),(6,1),(7,1),(8,1),(10,3),(13,2),(14,1),(16,2),(17,2),(18,2),(20,3),(21,3);
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price` double(8,2) NOT NULL,
  `discount` int(11) DEFAULT 0,
  `image` varchar(100) NOT NULL,
  `brand_id` bigint(20) DEFAULT NULL,
  `lifestage_id` bigint(20) DEFAULT NULL,
  `stock` int(5) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `lifestage_id` (`lifestage_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`lifestage_id`) REFERENCES `lifestages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Whiskas sabor carne','',1200.00,0,'prod-1697481402131.jpg',1,3,418),(2,'Felix sobrecito sabor carne 300g','sobrecito de alimento para tu gato',2590.00,10,'prod-1697500624684.png',3,3,412),(3,'Alimento para gatos Sabrositos Sabores de Mar x 1 ','',1044.00,10,'prod-1697502155730.jpg',5,2,123),(4,'Alimento para gatos cachorros bebes CatPro Kitten ','',17549.00,20,'prod-1697502291678.png',6,1,521),(6,'Alimento Para Gatos Sabrositos Mix X 1 Kg','',1500.00,0,'prod-1697502556841.jpeg',5,1,21),(7,'Alimento Whiskas 1+ Whiskas Gatos para gato adulto','',2000.00,50,'prod-1697502668987.jpg',1,1,68),(8,'Royal Canin Light Weight Care Pouch 85g','',1200.00,0,'prod-1697549435681.jpg',4,2,187),(10,'Cepillo para Gatos','',700.00,0,'prod-1698459555151.jpeg',6,2,258),(13,'Kit Bandeja Sanitaria Gato Comedero Palita Piedras','',4000.00,0,'prod-1698515033147.jpg',8,1,20),(14,'Felix Megamix Adulto X15kg','',500.00,5,'prod-1698515185171.jpg',3,3,534),(16,'Torre, Rascador, Gimnasio Para Gato Helena.cats','Helena Cats; Hacemos envíos a todo el Pais!!! La inspiración nace del Amor a los animales y el respeto por la naturaleza!   Transformamos tus ideas y sueños en realidad, combina las distintas opciones, crea tu propio mueble rascador, nosotros te ayudamos y recomendamos para garantizar la calidad y durabilidad que nos caracteriza. Un mueble hecho con Amor ya nos es solo un mueble.  Construido en madera MDF de 9 y 12 mm bajo los procesos de encolado y presión, tubos de 10cm de diámetro y 8mm de espesor, garantizan una confiabilidad, robustez, durabilidad y calidad que nos caracterizan.',48000.00,0,'prod-1698867082621.jpg',9,2,10),(17,'Rascador De Poste Zootec','El Rascador de poste para Gatos ZOOTEC es el juguete ideal para su gato. Su mascota podrá jugar con su pluma colgante mientras se frota contra el rascador, evitando que dañe los objetos de la casa. Para que nuestro gato se sienta atraído al rascador, debemos frotar un poco de hierba gatera sobre él, que llamará la atención del gato debido a sus propiedades aromáticas.  • Medidas mod. N° 1: 45 cm de alto, diámetro poste 75 mm, base de 30 x 30 cm.',9570.00,0,'prod-1698867187003.jpg',10,2,12),(18,'Cama Rascador Para Gato Alfombra Para Piso Osb Afr','El rascador y camita para los reyes de la casa con forma de michi. Va en el piso. Ideal para cambiar tu rascador de cartón que ensucia en cada rascada ;)  Los gatitos lo aman, porque lo usan como cama y rascador, lo adoptan como su lugar preferido.  Michi se rasca en michi  Medidas: 41 x 46 cm  MADERA: OSB  Alfombra GRIS claro.  *No tiene antideslizante ya que al ser de madera OSB se mantiene firme cuando tu gatito lo usa, super comprobado que no se va a mover ya que con el peso del michi es suficiente!!*',8200.00,10,'prod-1698867274523.jpg',10,2,16),(20,'Bandeja Sanitaria Para Gatos Mediana','Pet & Fish tienda de mascotas acuario. Envíos a todo el país a través de correo argentino o por envío Flex que te llega rápido a domicilio. Retiros en persona por nuestro local en Ramos Mejia. Bandeja sanitaria para gatos Mediana 40x30x11 cm. El precio es por unidad. colores varios depende el stock del momento. Preguntar disponibilidad de colores antes de comprar sino se enviará el color disponible en el momento.',1770.00,0,'prod-1698867824552.jpg',8,1,50),(21,'Bandeja Litera Sanitaria Gigante Gato Felix','Bandeja sanitaria Grande para Gatos, Conejos y Coballos Tamaño de la Litera 50 de largo x 35 de Ancho x12 De Alto.',4857.00,0,'prod-1698868737394.jpg',3,2,134);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `description` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'client');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `surname` varchar(30) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birthday` date NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `rol_id` int(2) NOT NULL,
  `active` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aleyufra28','Alejandro','Yufra','aleyufra@gmail.com','$2a$10$lp6ooor4PIRxgMnnM058ieN95qFgidqCEhxkxMD0ePnkwbeowiCE2','2001-11-28','1697334065618-img.jpg',1,1),(6,'Zekiel22','Ezequiel','Ayarde','ezeayarde@gmail.com','$2a$10$RqsO2XN2deDMEBEuRin6K.UVMud2EiBsz2nb.dFhBY0AIKlZoSt.y','2001-12-22','1698797978453-img.jpg',2,1),(7,'nadiiaa99','Nadia','Fernandez','fnadia@gmail.com','$2a$10$pA2YIOyLHv/arY2SWqIZr.7S96fHVjL4mZ5Nmco02ul3.A8ndmlH.','1999-08-17','1698869043326-img.jpeg',2,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-01 17:17:41

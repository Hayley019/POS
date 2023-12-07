-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pos
-- ------------------------------------------------------
-- Server version	5.7.33

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
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `concept` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,'2022-06-08 20:34:00','2022-07-08 21:31:41','walmart',234,'dolor sit ameth'),(2,'2022-07-08 20:35:50','2022-07-08 20:35:50','lorem ipsum',123,'dolor sit ameth'),(4,'2022-07-13 01:10:22','2022-07-13 01:10:31','Smart',230,'dolor sit ameth');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchs`
--

DROP TABLE IF EXISTS `branchs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(45) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchs`
--

LOCK TABLES `branchs` WRITE;
/*!40000 ALTER TABLE `branchs` DISABLE KEYS */;
INSERT INTO `branchs` VALUES (1,'2022-06-28 11:09:24','2022-06-28 11:09:24','ASDAD','1231231','QERFASF'),(7,'2022-06-28 11:13:29','2022-06-28 11:13:29','bsfcfvsdf','2341',NULL);
/*!40000 ALTER TABLE `branchs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos_en_venta`
--

DROP TABLE IF EXISTS `productos_en_venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos_en_venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta` int(11) NOT NULL,
  `producto` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`id`,`venta`,`producto`),
  KEY `fk_ventas_has_products_products1_idx` (`producto`),
  KEY `fk_ventas_has_products_ventas1_idx` (`venta`),
  CONSTRAINT `fk_ventas_has_products_products1` FOREIGN KEY (`producto`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_ventas_has_products_ventas1` FOREIGN KEY (`venta`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos_en_venta`
--

LOCK TABLES `productos_en_venta` WRITE;
/*!40000 ALTER TABLE `productos_en_venta` DISABLE KEYS */;
INSERT INTO `productos_en_venta` VALUES (10,6,1,23),(12,6,2,5),(13,18,1,5),(14,18,2,1),(15,22,1,4),(16,23,2,3),(17,25,3,1),(18,25,2,1),(20,26,2,3),(22,26,3,2),(23,26,4,1),(24,29,2,1),(25,29,3,2),(26,34,2,1),(27,34,3,2),(28,34,4,1),(29,35,4,1),(30,35,3,1),(31,35,2,1);
/*!40000 ALTER TABLE `productos_en_venta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(190) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `status` tinyint(2) NOT NULL DEFAULT '0',
  `category` varchar(100) DEFAULT NULL,
  `image` int(11) DEFAULT NULL,
  `sku` varchar(45) NOT NULL,
  `user` int(11) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_registration1_idx` (`user`),
  CONSTRAINT `fk_products_registration1` FOREIGN KEY (`user`) REFERENCES `registration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Manzana',20,'Manzana roja',0,'Frutas',1,'MANZANA20',1,NULL,NULL),(2,'Coca Cola 250ml',20.5,'Coca Cola 250ml',1,'Bebidas',NULL,'COCACOLA250ML',1,NULL,NULL),(3,'Tacos al pastor Maiz Sencillo',80,NULL,1,'Tacos',NULL,'TACOSPASTORMAIZSENCILLO',1,NULL,NULL),(4,'Tacos al pastor Harina Sencillo',90,NULL,1,'Tacos',NULL,'TACOSPASTORHARINASENCILLO',1,NULL,NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(190) DEFAULT NULL,
  `lastName` varchar(190) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `number` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES (1,'Alfonso','Martinez','alfonsomtz.96@gmail.com','$2y$10$OwZMsoaZ0ahNqaJEqCMYDu7Wkix98gkif9ZLpwKqOW5SGnrDIjVGC','6564261201');
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uploads`
--

DROP TABLE IF EXISTS `uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uploads` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `size` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `path` varchar(255) NOT NULL,
  `active` tinyint(2) NOT NULL DEFAULT '1',
  `user` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_uploads_registration1_idx` (`user`),
  CONSTRAINT `fk_uploads_registration1` FOREIGN KEY (`user`) REFERENCES `registration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uploads`
--

LOCK TABLES `uploads` WRITE;
/*!40000 ALTER TABLE `uploads` DISABLE KEYS */;
INSERT INTO `uploads` VALUES (1,'09fd581e-2656-453f-9ad4-3c833aea72f6.png','114160','image/jpeg','uploads/09fd581e-2656-453f-9ad4-3c833aea72f6.png',1,1),(2,'7ae494bb-e9f0-4d55-a0c3-e451cbb15994.png','16328','image/webp','uploads/7ae494bb-e9f0-4d55-a0c3-e451cbb15994.png',1,1);
/*!40000 ALTER TABLE `uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created_at` datetime NOT NULL,
  `total` float DEFAULT NULL,
  `subtotal` float DEFAULT NULL,
  `iva` float DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `user` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `folio` int(11) NOT NULL,
  `notes` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_ventas_registration_idx` (`user`),
  CONSTRAINT `fk_ventas_registration` FOREIGN KEY (`user`) REFERENCES `registration` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (5,'2022-06-16 18:05:27',140,117.6,22.4,'ABIERTA',1,'2022-06-16 18:05:27','Luis',0,NULL),(6,'2022-06-16 18:08:40',562.5,472.5,90,'ABIERTA',1,'2022-06-16 21:58:52','Alfonso',1,NULL),(7,'2022-06-14 18:08:53',60,50.4,9.6,'CANCELADA',1,'2022-06-28 08:11:19','Luis',0,NULL),(8,'2022-06-14 18:08:53',60,50.4,9.6,'CERRADA',1,'2022-06-28 08:11:24','Jose',1,NULL),(9,'2022-06-14 18:08:53',60,50.4,9.6,'ABIERTA',1,'2022-06-14 18:08:53','Kike',2,NULL),(10,'2022-06-14 18:08:53',60,50.4,9.6,'ABIERTA',1,'2022-06-14 18:08:53','Kike',3,NULL),(11,'2022-06-14 18:08:53',60,50.4,9.6,'ABIERTA',1,'2022-06-14 18:08:53','Hayde',4,NULL),(12,'2022-06-16 19:37:30',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:37:30',NULL,2,NULL),(13,'2022-06-16 19:38:55',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:38:55',NULL,3,NULL),(14,'2022-06-16 19:39:38',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:39:38',NULL,4,NULL),(15,'2022-06-16 19:39:57',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:39:57',NULL,5,NULL),(16,'2022-06-16 19:40:12',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:40:12',NULL,6,NULL),(17,'2022-06-16 19:41:38',NULL,NULL,NULL,'ABIERTA',1,'2022-06-16 19:41:38',NULL,7,NULL),(18,'2022-06-16 19:41:57',120,100.8,19.2,'ABIERTA',1,'2022-06-16 21:57:48','Karla',8,NULL),(21,'2022-06-19 18:58:45',NULL,NULL,NULL,'ABERTA',1,'2022-06-19 18:58:45',NULL,2,NULL),(22,'2022-06-19 19:16:51',80,67.2,12.8,'ABERTA',1,'2022-06-19 19:17:23','Roberto',3,NULL),(23,'2022-06-21 10:31:26',61.5,51.66,9.84,'ABERTA',1,'2022-06-21 22:35:34','null',0,NULL),(24,'2022-06-21 21:45:57',NULL,NULL,NULL,'ABIERTA',1,'2022-06-21 21:45:57',NULL,1,NULL),(25,'2022-06-28 08:48:06',100.5,84.42,16.08,'ABIERTA',1,'2022-06-28 08:48:11','Karla',0,NULL),(26,'2022-07-04 20:49:21',311.5,261.66,49.84,'ABIERTA',1,'2022-07-06 22:01:32','',0,NULL),(27,'2022-07-04 21:12:28',NULL,NULL,NULL,'ABIERTA',1,'2022-07-04 21:12:28',NULL,1,NULL),(28,'2022-07-04 21:12:30',NULL,NULL,NULL,'ABIERTA',1,'2022-07-04 21:12:30',NULL,2,NULL),(29,'2022-07-06 22:02:14',180.5,151.62,28.88,'ABIERTA',1,'2022-07-07 21:58:14','X',0,'Sin salsa y las tortillas bien calientes'),(30,'2022-07-06 22:02:18',0,0,0,'CANCELADA',1,'2022-07-07 21:59:02','',1,'null'),(31,'2022-07-06 22:02:21',NULL,NULL,NULL,'CERRADA',1,'2022-07-07 21:59:05','null',2,'null'),(32,'2022-07-06 22:02:23',NULL,NULL,NULL,'ABIERTA',1,'2022-07-06 22:02:23',NULL,3,NULL),(33,'2022-07-06 22:02:25',NULL,NULL,NULL,'ABIERTA',1,'2022-07-06 22:02:25',NULL,4,NULL),(34,'2022-07-07 22:02:44',270.5,227.22,43.28,'ABIERTA',1,'2022-07-07 22:19:12','Alfonso',0,'Sin pina'),(35,'2022-07-08 07:18:44',190.5,160.02,30.48,'ABIERTA',1,'2022-07-08 19:09:33','',0,'');
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-12 21:56:43

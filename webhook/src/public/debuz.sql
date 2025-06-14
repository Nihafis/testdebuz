-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for debuz
CREATE DATABASE IF NOT EXISTS `debuz` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `debuz`;

-- Dumping structure for table debuz.subscriber
CREATE TABLE IF NOT EXISTS `subscriber` (
  `sub_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `url` text DEFAULT NULL,
  `secret` text DEFAULT NULL,
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table debuz.subscriber: ~1 rows (approximately)
INSERT INTO `subscriber` (`sub_id`, `url`, `secret`) VALUES
	(2, 'http://localhost:8000/receive', '3966844df64a681dfbaf2a6f62f215c9e68f438eef5e2a4504f1f95a55879828'),
	(9, 'http://localhost:3000/receive', '774af743fa583d4d3c7a12c383b17044b906f55dd605106fcf803683930e11f3');

-- Dumping structure for table debuz.subscribe_data
CREATE TABLE IF NOT EXISTS `subscribe_data` (
  `tx_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `message` text DEFAULT NULL,
  PRIMARY KEY (`tx_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table debuz.subscribe_data: ~6 rows (approximately)
INSERT INTO `subscribe_data` (`tx_id`, `message`) VALUES
	(1, 'test'),
	(2, 'test'),
	(3, 'test'),
	(4, 'test'),
	(5, 'test'),
	(6, 'test');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

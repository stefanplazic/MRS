-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 14, 2020 at 10:54 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `TNWdy57nHy`
--

-- --------------------------------------------------------

--
-- Table structure for table `ClinicGrades`
--

CREATE TABLE `ClinicGrades` (
  `id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ClinicGrades`
--

INSERT INTO `ClinicGrades` (`id`, `clinic_id`, `user_id`, `grade`, `createdAt`, `updatedAt`) VALUES
(4, 1, 1, 1, '2020-06-11 06:59:51', '2020-06-11 06:59:51');

-- --------------------------------------------------------

--
-- Table structure for table `Clinics`
--

CREATE TABLE `Clinics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Clinics`
--

INSERT INTO `Clinics` (`id`, `name`, `location`, `createdAt`, `updatedAt`) VALUES
(1, 'Super clinica', 9, '2020-05-19 00:00:00', '2020-05-06 00:00:00'),
(2, 'Sveti vid', 10, '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(3, 'Tirsova', 9, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `DiagnosisLists`
--

CREATE TABLE `DiagnosisLists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DoctorAviabilities`
--

CREATE TABLE `DoctorAviabilities` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `day_of_the_week` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `start_time` timestamp NOT NULL,
  `end_time` timestamp NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DoctorAviabilities`
--

INSERT INTO `DoctorAviabilities` (`id`, `doctor_id`, `day_of_the_week`, `start_time`, `end_time`, `createdAt`, `updatedAt`) VALUES
(1, 10, 'Sut', '2020-06-06 05:00:00', '2020-06-06 13:00:00', '2020-06-03 00:00:00', '2020-06-03 00:00:00'),
(2, 10, 'Sun', '2020-06-07 07:00:00', '2020-06-07 15:00:00', '2020-06-07 00:00:00', '2020-06-07 00:00:00'),
(3, 10, 'Mon', '2020-06-08 06:00:00', '2020-06-08 15:00:00', '2020-06-08 00:00:00', '2020-06-08 00:00:00'),
(4, 10, 'Tue', '2020-06-08 04:00:00', '2020-06-08 15:00:00', '2020-06-08 00:00:00', '2020-06-08 00:00:00'),
(7, 10, 'Wed', '2020-06-14 08:00:00', '2020-06-14 16:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(8, 10, 'Thu', '2020-06-14 06:00:00', '2020-06-14 15:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(9, 10, 'Fri', '2020-06-14 06:00:00', '2020-06-14 16:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(10, 12, 'Sut', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(11, 12, 'Sun', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(12, 12, 'Mon', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(13, 12, 'Tue', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(14, 12, 'Wed', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(15, 12, 'Thu', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(16, 12, 'Fri', '2020-06-14 05:00:00', '2020-06-14 09:00:00', '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `DoctorData`
--

CREATE TABLE `DoctorData` (
  `id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `timeslot_per_client` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DoctorData`
--

INSERT INTO `DoctorData` (`id`, `clinic_id`, `user_id`, `timeslot_per_client`, `createdAt`, `updatedAt`) VALUES
(1, 1, 10, 30, '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(2, 3, 12, 30, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `DoctorGrades`
--

CREATE TABLE `DoctorGrades` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `grade` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DoctorSpecializations`
--

CREATE TABLE `DoctorSpecializations` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `specialization_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DoctorSpecializations`
--

INSERT INTO `DoctorSpecializations` (`id`, `doctor_id`, `specialization_id`, `createdAt`, `updatedAt`) VALUES
(1, 10, 1, '2020-05-25 00:00:00', '2020-05-25 00:00:00'),
(2, 10, 2, '2020-06-02 00:00:00', '2020-06-02 00:00:00'),
(3, 12, 4, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `DrugLists`
--

CREATE TABLE `DrugLists` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Locations`
--

CREATE TABLE `Locations` (
  `id` int(11) NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Locations`
--

INSERT INTO `Locations` (`id`, `address`, `city`, `state`, `lat`, `lng`, `createdAt`, `updatedAt`) VALUES
(1, 'Some address kdsjflksdjfsldjk', 'Beograd', 'Zemun', 130, 125, '2020-04-20 00:00:00', '2020-05-06 14:38:23'),
(2, 'aaaaaa', 'Belgrade', 'Serbia', 15151, 1515150, '2020-04-20 00:00:00', '2020-04-21 00:00:00'),
(6, 'sdlfsjdlfsjd', 'beograd', 'serbia', 15.25, 25.35, '2020-04-30 17:01:31', '2020-04-30 17:01:31'),
(7, 'kfdjfklsj', 'kfdjflkj', 'kfjdklfdsj', 55.8684, 37.4971, '2020-05-04 14:52:47', '2020-05-04 14:52:47'),
(8, 'klfjsdlkj', 'kfjdsl', 'jklfjsdlkj', 55.853, 37.6454, '2020-05-04 14:54:33', '2020-05-04 14:54:33'),
(9, 'Knez mihajlova', 'Belgrade', 'Serbia', 25.22, 152.21, '2020-05-26 00:00:00', '2020-05-26 00:00:00'),
(10, 'Dubrovacka 25', 'Belgrade', 'Serbia', 155, 123, '2020-05-25 00:00:00', '2020-05-28 00:00:00'),
(11, 'VOjni put ', 'Belgrade', 'Serbia', 55.8168, 38.0187, '2020-05-06 13:27:45', '2020-05-06 13:27:45'),
(12, 'Vojni put blok 2 2544', 'Belgrade', 'Serbia', 55.7596, 37.398, '2020-05-06 15:26:08', '2020-05-06 15:28:09');

-- --------------------------------------------------------

--
-- Table structure for table `MedicalRecords`
--

CREATE TABLE `MedicalRecords` (
  `id` int(11) NOT NULL,
  `medical_history` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `blood_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diopter` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `patient_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `MedicalRecords`
--

INSERT INTO `MedicalRecords` (`id`, `medical_history`, `height`, `weight`, `blood_type`, `diopter`, `patient_id`, `createdAt`, `updatedAt`) VALUES
(1, 'A patient is a schizophrenic maniac, so be gentle to him...', 171, 60, 'A', '-1.5', 1, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `PatientData`
--

CREATE TABLE `PatientData` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `identification_number` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PatientData`
--

INSERT INTO `PatientData` (`id`, `phone`, `identification_number`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, '050599368', '050599368', 1, '2020-04-20 00:00:00', '2020-05-06 14:38:24'),
(9, '06003158965', '0203158965', 11, '2020-05-06 15:26:08', '2020-05-06 15:28:09');

-- --------------------------------------------------------

--
-- Table structure for table `PatientStatuses`
--

CREATE TABLE `PatientStatuses` (
  `id` int(11) NOT NULL,
  `status_type` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `refused_msg` enum('a','d','p') COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PatientStatuses`
--

INSERT INTO `PatientStatuses` (`id`, `status_type`, `refused_msg`, `user_id`, `createdAt`, `updatedAt`) VALUES
(1, '', 'a', 1, '2020-04-27 00:00:00', '2020-04-30 12:11:59'),
(8, NULL, 'a', 11, '2020-05-06 15:26:08', '2020-05-06 15:26:37');

-- --------------------------------------------------------

--
-- Table structure for table `Prescriptions`
--

CREATE TABLE `Prescriptions` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `drug` int(11) DEFAULT NULL,
  `schedule_review` int(11) DEFAULT NULL,
  `approved` tinyint(1) DEFAULT NULL,
  `nurse` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `id` int(11) NOT NULL,
  `name` enum('patient','doctor','nurse','clinic_admin','clinic_center_admin') COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'patient', '2020-04-02 00:00:00', '2020-04-22 00:00:00'),
(2, 'clinic_center_admin', '2020-04-14 00:00:00', '2020-04-20 00:00:00'),
(3, 'doctor', '2020-05-25 00:00:00', '2020-05-25 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Rooms`
--

CREATE TABLE `Rooms` (
  `id` int(11) NOT NULL,
  `floor` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `clinic_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Rooms`
--

INSERT INTO `Rooms` (`id`, `floor`, `label`, `clinic_id`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'Romm A1', 1, '2020-05-15 00:00:00', '2020-05-15 00:00:00'),
(2, '2', 'Opearion room ', 3, '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(3, '1', 'Rendgen room', 2, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `SchedulePrices`
--

CREATE TABLE `SchedulePrices` (
  `id` int(11) NOT NULL,
  `schedule_type_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `price` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ScheduleReviews`
--

CREATE TABLE `ScheduleReviews` (
  `id` int(11) NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diagnosis` int(11) NOT NULL,
  `medicalRecord` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Schedules`
--

CREATE TABLE `Schedules` (
  `id` int(11) NOT NULL,
  `patienId` int(11) DEFAULT NULL,
  `scheduleType` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `doctorId` int(11) NOT NULL,
  `start_timestamp` datetime DEFAULT NULL,
  `end_timestamp` datetime DEFAULT NULL,
  `roomId` int(11) DEFAULT NULL,
  `price` float NOT NULL DEFAULT '0',
  `discount` float NOT NULL DEFAULT '0',
  `reserved` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Schedules`
--

INSERT INTO `Schedules` (`id`, `patienId`, `scheduleType`, `doctorId`, `start_timestamp`, `end_timestamp`, `roomId`, `price`, `discount`, `reserved`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'checkout', 10, '2020-05-21 10:00:00', '2020-05-21 08:30:00', 1, 0, 0, 1, '2020-05-15 00:00:00', '2020-06-14 09:09:17'),
(2, 1, 'operation', 10, '2020-06-08 08:00:00', '2020-06-08 08:30:00', 1, 0, 0, 1, '2020-05-13 00:00:00', '2020-06-07 10:32:05'),
(3, 1, 'operation', 10, '2020-06-08 06:30:00', '2020-06-08 07:00:00', 1, 300, 20, 1, '2020-05-19 00:00:00', '2020-05-20 16:28:47'),
(53, NULL, 'Eye doctor', 10, '2020-06-18 09:00:00', '2020-06-18 09:30:00', 1, 1000, 0, 0, '2020-06-14 09:15:41', '2020-06-14 09:41:06'),
(55, 1, 'Kardio hirug', 12, '2020-06-16 07:30:00', '2020-06-16 08:00:00', 1, 1000, 0, 1, '2020-06-14 10:51:43', '2020-06-14 10:52:25'),
(56, NULL, 'Leg operation', 12, '2020-06-14 06:00:00', '2020-06-14 06:30:00', 3, 200, 10, 0, '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `ScheduleTypes`
--

CREATE TABLE `ScheduleTypes` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ScheduleTypes`
--

INSERT INTO `ScheduleTypes` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'eye checkout', '2020-06-13 00:00:00', '2020-06-13 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Specializations`
--

CREATE TABLE `Specializations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Specializations`
--

INSERT INTO `Specializations` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Eye doctor', '2020-05-26 00:00:00', '2020-05-28 00:00:00'),
(2, 'Lung doctor', '2020-05-19 00:00:00', '2020-05-29 00:00:00'),
(3, 'Kardio hirug', '2020-06-14 00:00:00', '2020-06-14 00:00:00'),
(4, 'Leg opeartion', '2020-06-14 00:00:00', '2020-06-14 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Tokens`
--

CREATE TABLE `Tokens` (
  `id` int(11) NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Tokens`
--

INSERT INTO `Tokens` (`id`, `code`, `user_id`, `createdAt`, `updatedAt`) VALUES
(3, 'U5teZSUbsSO3yWiNyjDM', 9, '2020-05-06 13:33:18', '2020-05-06 13:33:18');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `location` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `fName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `email`, `password`, `verified`, `role_id`, `location`, `createdAt`, `updatedAt`, `fName`, `lName`) VALUES
(1, 'stefan.plazic@gmail.com', 'stefan', 1, 1, 1, '2020-04-20 00:00:00', '2020-05-06 14:38:23', 'Stefi', 'Niko'),
(2, 'admin@gmail.com', 'admin', 1, 2, 2, '2020-04-27 00:00:00', '2020-04-28 00:00:00', 'Admin', 'Admin'),
(10, 'doctor@gmail.com', 'doctor', 1, 3, 11, '2020-05-25 00:00:00', '2020-05-25 00:00:00', 'Doctor', 'Doctor'),
(11, 'malizicpla@gmail.com', 'patka', 1, 1, 12, '2020-05-06 15:26:08', '2020-05-06 15:28:09', 'Stefan', 'Neko'),
(12, 'doctor3@gmail.com', 'doctor', 1, 3, 1, '2020-06-14 00:00:00', '2020-06-14 00:00:00', 'Pera', 'Doktor');

-- --------------------------------------------------------

--
-- Table structure for table `Vacations`
--

CREATE TABLE `Vacations` (
  `id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `vacation_date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ClinicGrades`
--
ALTER TABLE `ClinicGrades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_id` (`clinic_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Clinics`
--
ALTER TABLE `Clinics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `location` (`location`);

--
-- Indexes for table `DiagnosisLists`
--
ALTER TABLE `DiagnosisLists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `DoctorAviabilities`
--
ALTER TABLE `DoctorAviabilities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `DoctorData`
--
ALTER TABLE `DoctorData`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_id` (`clinic_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `DoctorGrades`
--
ALTER TABLE `DoctorGrades`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `DoctorSpecializations`
--
ALTER TABLE `DoctorSpecializations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `specialization_id` (`specialization_id`);

--
-- Indexes for table `DrugLists`
--
ALTER TABLE `DrugLists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Locations`
--
ALTER TABLE `Locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MedicalRecords`
--
ALTER TABLE `MedicalRecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `PatientData`
--
ALTER TABLE `PatientData`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `PatientStatuses`
--
ALTER TABLE `PatientStatuses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Prescriptions`
--
ALTER TABLE `Prescriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clinic_id` (`clinic_id`);

--
-- Indexes for table `SchedulePrices`
--
ALTER TABLE `SchedulePrices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `schedule_type_id` (`schedule_type_id`),
  ADD KEY `clinic_id` (`clinic_id`);

--
-- Indexes for table `ScheduleReviews`
--
ALTER TABLE `ScheduleReviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `diagnosis` (`diagnosis`),
  ADD KEY `medicalRecord` (`medicalRecord`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `Schedules`
--
ALTER TABLE `Schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `patienId` (`patienId`),
  ADD KEY `doctorId` (`doctorId`),
  ADD KEY `roomId` (`roomId`);

--
-- Indexes for table `ScheduleTypes`
--
ALTER TABLE `ScheduleTypes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Specializations`
--
ALTER TABLE `Specializations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Tokens`
--
ALTER TABLE `Tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `location` (`location`);

--
-- Indexes for table `Vacations`
--
ALTER TABLE `Vacations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ClinicGrades`
--
ALTER TABLE `ClinicGrades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Clinics`
--
ALTER TABLE `Clinics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `DiagnosisLists`
--
ALTER TABLE `DiagnosisLists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DoctorAviabilities`
--
ALTER TABLE `DoctorAviabilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `DoctorData`
--
ALTER TABLE `DoctorData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `DoctorGrades`
--
ALTER TABLE `DoctorGrades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `DoctorSpecializations`
--
ALTER TABLE `DoctorSpecializations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `DrugLists`
--
ALTER TABLE `DrugLists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Locations`
--
ALTER TABLE `Locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `MedicalRecords`
--
ALTER TABLE `MedicalRecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PatientData`
--
ALTER TABLE `PatientData`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `PatientStatuses`
--
ALTER TABLE `PatientStatuses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Prescriptions`
--
ALTER TABLE `Prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Rooms`
--
ALTER TABLE `Rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `SchedulePrices`
--
ALTER TABLE `SchedulePrices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ScheduleReviews`
--
ALTER TABLE `ScheduleReviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Schedules`
--
ALTER TABLE `Schedules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `ScheduleTypes`
--
ALTER TABLE `ScheduleTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Specializations`
--
ALTER TABLE `Specializations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Tokens`
--
ALTER TABLE `Tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `Vacations`
--
ALTER TABLE `Vacations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ClinicGrades`
--
ALTER TABLE `ClinicGrades`
  ADD CONSTRAINT `ClinicGrades_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `Clinics` (`id`),
  ADD CONSTRAINT `ClinicGrades_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Clinics`
--
ALTER TABLE `Clinics`
  ADD CONSTRAINT `Clinics_ibfk_1` FOREIGN KEY (`location`) REFERENCES `Locations` (`id`);

--
-- Constraints for table `DoctorAviabilities`
--
ALTER TABLE `DoctorAviabilities`
  ADD CONSTRAINT `DoctorAviabilities_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `DoctorData`
--
ALTER TABLE `DoctorData`
  ADD CONSTRAINT `DoctorData_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `Clinics` (`id`),
  ADD CONSTRAINT `DoctorData_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `DoctorGrades`
--
ALTER TABLE `DoctorGrades`
  ADD CONSTRAINT `DoctorGrades_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `DoctorGrades_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `DoctorSpecializations`
--
ALTER TABLE `DoctorSpecializations`
  ADD CONSTRAINT `DoctorSpecializations_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `DoctorSpecializations_ibfk_2` FOREIGN KEY (`specialization_id`) REFERENCES `Specializations` (`id`);

--
-- Constraints for table `MedicalRecords`
--
ALTER TABLE `MedicalRecords`
  ADD CONSTRAINT `MedicalRecords_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `PatientData`
--
ALTER TABLE `PatientData`
  ADD CONSTRAINT `PatientData_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `PatientStatuses`
--
ALTER TABLE `PatientStatuses`
  ADD CONSTRAINT `PatientStatuses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Rooms`
--
ALTER TABLE `Rooms`
  ADD CONSTRAINT `Rooms_ibfk_1` FOREIGN KEY (`clinic_id`) REFERENCES `Clinics` (`id`);

--
-- Constraints for table `SchedulePrices`
--
ALTER TABLE `SchedulePrices`
  ADD CONSTRAINT `SchedulePrices_ibfk_1` FOREIGN KEY (`schedule_type_id`) REFERENCES `ScheduleTypes` (`id`),
  ADD CONSTRAINT `SchedulePrices_ibfk_2` FOREIGN KEY (`clinic_id`) REFERENCES `Clinics` (`id`);

--
-- Constraints for table `ScheduleReviews`
--
ALTER TABLE `ScheduleReviews`
  ADD CONSTRAINT `ScheduleReviews_ibfk_1` FOREIGN KEY (`diagnosis`) REFERENCES `DiagnosisLists` (`id`),
  ADD CONSTRAINT `ScheduleReviews_ibfk_2` FOREIGN KEY (`medicalRecord`) REFERENCES `MedicalRecords` (`id`),
  ADD CONSTRAINT `ScheduleReviews_ibfk_3` FOREIGN KEY (`doctor_id`) REFERENCES `Users` (`id`);

--
-- Constraints for table `Schedules`
--
ALTER TABLE `Schedules`
  ADD CONSTRAINT `Schedules_ibfk_1` FOREIGN KEY (`patienId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `Schedules_ibfk_2` FOREIGN KEY (`doctorId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `Schedules_ibfk_3` FOREIGN KEY (`roomId`) REFERENCES `Rooms` (`id`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `Roles` (`id`),
  ADD CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`location`) REFERENCES `Locations` (`id`);

--
-- Constraints for table `Vacations`
--
ALTER TABLE `Vacations`
  ADD CONSTRAINT `Vacations_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `Users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

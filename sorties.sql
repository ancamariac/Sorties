-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2022 at 04:04 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sorties`
--

-- --------------------------------------------------------

--
-- Table structure for table `angajati`
--

CREATE TABLE `angajati` (
  `Angajat_ID` int(11) NOT NULL,
  `Departament_ID` int(11) DEFAULT NULL,
  `Nume` varchar(50) NOT NULL,
  `Prenume` varchar(50) NOT NULL,
  `Sex` varchar(1) NOT NULL,
  `Adresa` varchar(100) NOT NULL,
  `CNP` varchar(13) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Parola` varchar(20) NOT NULL,
  `Data_angajarii` date DEFAULT NULL,
  `Data_nasterii` date DEFAULT NULL
) ;

--
-- Dumping data for table `angajati`
--

INSERT INTO `angajati` (`Angajat_ID`, `Departament_ID`, `Nume`, `Prenume`, `Sex`, `Adresa`, `CNP`, `Username`, `Parola`, `Data_angajarii`, `Data_nasterii`) VALUES
(100, 1, 'Popescu', 'Ana', 'F', 'Aleea Lebedei, nr. 2, Braila ', '6000630090056', 'ana', 'a', '2017-11-09', '2000-10-06'),
(101, 2, 'Rusu', 'Stefania', 'F', 'Aleea Fluturilor, nr. 23, Braila', '1900420240062', 'rusu_stefania', 'abc12', '2019-12-09', '1999-06-11'),
(502, 3, 'Luca', 'Ion', 'M', 'Aleea Lebedei, nr. 22', '6000630090048', 'luca_ion', 'abc15', '2015-12-12', '2000-01-06'),
(504, 4, 'Popa', 'Mihaela', 'F', 'Strada Amurgului, nr. 45', '6000730090055', 'popa_mihaela', 'abc20', '2021-12-01', '2001-10-06'),
(505, 5, 'Ionita', 'Costel', 'M', 'Aleea Vulturilor, nr. 8', '6020305412837', 'ionita_costel', 'abc22', '2020-12-09', '1998-05-11'),
(506, 6, 'Zavoi', 'Mihnea', 'M', 'Strada Stejaru, nr. 89', '2940829183981', 'zavoi_mihnea', 'abc44', '2013-12-21', '2001-05-09'),
(507, 7, 'Barbu', 'Stefan', 'M', 'Aleea Pian, nr. 45', '2920518347211', 'barbu_stefan', 'abc55', '2016-12-17', '2000-01-02'),
(508, 1, 'Radu', 'Ana', 'F', 'Aleea Cutezatorilor, nr. 55', '6020704240176', 'radu_ana', 'abc88', '2020-09-17', '2005-01-06'),
(509, 1, 'Despina', 'Ionel', 'M', 'Strada Dorobantilor, nr. 48', '2890417387782', 'ion', 'a', '2021-11-16', '2006-10-07'),
(510, 2, 'Musat ', 'Alina', 'F', 'Aleea Neamtului, nr. 7', '5001216019126', 'musat_alina', 'abc90', '2021-09-11', '2002-10-04'),
(511, 2, 'Iancu', 'Andreea', 'F', 'Strada Rosiori, nr. 6', '2960612286968', 'iancu_andreea', 'abc67', '2021-07-27', '1996-06-01'),
(512, 3, 'Dumitriu', 'Cosmina', 'F', 'Strada Caramidari, nr. 5', '1930625219839', 'dumitriu_cosmina', 'abc19', '2021-05-20', '1994-05-11'),
(513, 3, 'Ifrim', 'George', 'M', 'Aleea Zidaru, nr. 7', '2860506529504', 'ifrim_george', 'abc90', '2021-11-27', '1992-06-11'),
(514, 4, 'Vlad', 'Angel', 'M', 'Aleea Cocor, nr. 6', '2990411434400', 'vlad_angel', 'abc79', '2021-10-19', '2001-09-06'),
(515, 4, 'Bendeac', 'Mihai', 'M', 'Strada Ion Luca Caragiale, nr. 6', '1980126206022', 'bendeac_mihai', 'abc66', '2021-09-11', '1990-05-11'),
(516, 5, 'Stanciu', 'David', 'M', 'Aleea Focului, nr. 89', '2960721127562', 'stanciu_david', 'abc45', '2021-05-01', '1988-05-11'),
(517, 5, 'Protap', 'Cosmin', 'M', 'Aleea Mielului, nr. 1', '1890711035941', 'protap_cosmin', 'abc68', '2021-08-14', '1993-09-12'),
(518, 6, 'Despina', 'Ionel', 'M', 'Aleea Ianis, nr. 4', '1900330397615', 'despina_ionel', 'abc29', '2012-08-10', '1989-03-10'),
(519, 6, 'Zaru', 'Cezara', 'F', 'Aleea Dumbrava, nr. 7', '1931122353465', 'zaru_cezara', 'abc00', '2015-10-14', '1998-01-01'),
(520, 7, 'Pirvu', 'Andrada', 'F', 'Aleea Dorului, nr. 9', '2900324100666', 'pirvu_andrada', 'abc94', '2017-12-09', '1999-01-05'),
(524, 1, 'Neacsu', 'Aurelia', 'F', 'Aleea Cocorilor, nr. 23', '2870506300141', 'neacsu_aurelia', 'a', '2022-01-08', '1970-06-03');

-- --------------------------------------------------------

--
-- Table structure for table `angajati-sarcini`
--

CREATE TABLE `angajati-sarcini` (
  `Angajat_ID` int(11) NOT NULL,
  `Sarcina_ID` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `clienti`
--

CREATE TABLE `clienti` (
  `Client_ID` int(11) NOT NULL,
  `Nume` varchar(50) NOT NULL,
  `Prenume` varchar(50) NOT NULL,
  `CNP` varchar(13) NOT NULL,
  `Sex` varchar(1) NOT NULL,
  `Adresa` varchar(100) NOT NULL,
  `Telefon` varchar(10) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Parola` varchar(20) NOT NULL,
  `Data_nasterii` date DEFAULT NULL
) ;

--
-- Dumping data for table `clienti`
--

INSERT INTO `clienti` (`Client_ID`, `Nume`, `Prenume`, `CNP`, `Sex`, `Adresa`, `Telefon`, `Username`, `Parola`, `Data_nasterii`) VALUES
(5, 'Rusu', 'Adi', '6000630090048', 'M', 'Aleea Pepeni, nr. 50', '0742987230', 'adi', 'a', '2000-01-06'),
(6, 'Sava', 'Iulian', '1900530241062', 'M', 'Strada Constantin Brancoveanu, nr. 4', '0721214786', 'sava.iuli', '111', '1998-05-11'),
(7, 'Soare', 'Marina', '6000652080066', 'F', 'Aleea Mihai Bravu, nr. 3', '0726323428', 'soare.marina', '111', '1995-06-11'),
(8, 'Mihai', 'Adina', '6020820368085', 'F', 'Aleea Panait Cerna, nr. 2', '0240575576', 'mihai.adina', '111', '1993-05-11'),
(9, 'Hodor', 'Radu', '2950614228789', 'M', 'Aleea Pasilor, nr. 78', '0742985645', 'hodor.radu', '112', '2001-10-06'),
(10, 'Sterian', 'Raluca', '5011023304770', 'F', 'Aleea Florilor, nr. 9', '0746343532', 'sterian.raluca', '123', '2000-11-07');

-- --------------------------------------------------------

--
-- Table structure for table `departamente`
--

CREATE TABLE `departamente` (
  `Departament_ID` int(11) NOT NULL,
  `Manager_ID` int(11) DEFAULT NULL,
  `Denumire` varchar(50) NOT NULL,
  `Cod_Departament` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departamente`
--

INSERT INTO `departamente` (`Departament_ID`, `Manager_ID`, `Denumire`, `Cod_Departament`) VALUES
(1, 100, 'Curatenie', 111),
(2, 101, 'Amenajari', 121),
(3, 502, 'Deratizare', 132),
(4, 504, 'Servicii medicale', 141),
(5, 505, 'Ambulanta veterinara', 155),
(6, 506, 'Termopane', 166),
(7, 507, 'Instalatii termice', 188);

-- --------------------------------------------------------

--
-- Table structure for table `sarcini`
--

CREATE TABLE `sarcini` (
  `Sarcina_ID` int(50) NOT NULL,
  `Serviciu_ID` int(11) NOT NULL,
  `Client_ID` int(11) NOT NULL,
  `Detalii` varchar(2000) NOT NULL,
  `Data` date NOT NULL,
  `Status` varchar(20) DEFAULT 'Nefinalizat',
  `Complexitate` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sarcini`
--

INSERT INTO `sarcini` (`Sarcina_ID`, `Serviciu_ID`, `Client_ID`, `Detalii`, `Data`, `Status`, `Complexitate`) VALUES
(60, 50, 5, 'Spalarea podelelor cu solutii profesionale, Stergerea de praf a mobilierului ', '2021-11-30', 'Nefinalizat', 0),
(65, 64, 7, 'As dori montarea centralei termice la o casa de 130 mp, 3 camere, 2 bai, bucatarie. As dori incalzirea prin pardoseala.', '2022-12-14', 'Nefinalizat', 0),
(66, 60, 8, 'As avea nevoie de niste injectii cu vitamine pentru imunitate scazuta.', '2021-12-17', 'Nefinalizat', 0),
(67, 59, 5, 'As dori o deparazitare pentru pisica mea care are 2 ani.', '2021-12-18', 'Nefinalizat', 0),
(68, 62, 10, 'Am un dulap care trebuie montat.', '2021-12-10', 'Nefinalizat', 0),
(71, 51, 10, 'As dori aspirarea unui spatiu de 120 mp in urma unei zugraviri.', '2021-12-18', 'Nefinalizat', 0),
(72, 51, 9, 'As dori aspirarea si spalarea a 5 carpete de 10 mp.', '2021-12-13', 'Nefinalizat', 0),
(73, 51, 9, 'As dori spalarea geamurilor pentru un apartament de 60 mp.', '2021-12-18', 'Nefinalizat', 0),
(74, 51, 9, 'Spalarea canapelelor.', '2021-12-30', 'Nefinalizat', 0),
(75, 52, 5, 'Aspirarea apartamentului - 80mp', '2021-12-25', 'Nefinalizat', 0),
(76, 51, 9, 'Curatenie completa - apartament 50 mp', '2021-12-29', 'Nefinalizat', 0),
(79, 63, 5, 'As dori sa imi montati centrala termica prin pardoseala.', '2022-01-15', 'Nefinalizat', 0);

-- --------------------------------------------------------

--
-- Table structure for table `servicii`
--

CREATE TABLE `servicii` (
  `Serviciu_ID` int(11) NOT NULL,
  `DepartamentID` int(11) NOT NULL,
  `Denumire` varchar(50) NOT NULL,
  `Cod_Serviciu` int(50) NOT NULL,
  `Descriere` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `servicii`
--

INSERT INTO `servicii` (`Serviciu_ID`, `DepartamentID`, `Denumire`, `Cod_Serviciu`, `Descriere`) VALUES
(50, 1, 'Curatenie generala', 121, 'Atunci simti ca esti depasit de situatie, nu ai timp, sau oricat ai curata casa si ea nu arata niciodata asa cum ti-ai dori, cand vin sarbatorile sau se anunta musafiri, ai nevoie de ajutor specializat pentru a finaliza curatenia generala intr-un timp record si cu rezultate exceptionale. Venim in ajutor oferindu-ti servicii de curatenie la cele mai inalte standarde de igiena.'),
(51, 1, 'Curatenie de intretinere', 131, 'Dorim sa lasi curatenia casei tale in grija noastra. Ocupa-te de ceea ce este cu adevarat important pentru tine. Ne adaptam programului tau astfel incat prezenta echipei noastre sa nu fie simtita decat prin calitatea serviciilor de curatenie oferite.'),
(52, 1, 'Curatenie dupa constructor', 141, 'Serviciul de curatenie dupa constructor necesita folosirea unor substante si echipamente speciale pentru a curata si elimina definitiv reziduurile dificile . Acest tip de curatenie nu poate fi efectuat cu aceleasi mijloace ca o curatenie obisnuita.'),
(53, 2, 'Proiectare', 151, 'Proiectare si  executie a constructiilor de case, vile, blocuri de apartamente, proiecte rezidentiale, cladiri de birouri, hoteluri, magazine, restaurant;'),
(54, 2, 'Finisaje', 152, 'Executia  finisajelor de calitate cu parchet, gresie, faianta, marmura, zugraveli;'),
(55, 3, 'Deratizare completa', 161, 'Serviciile complete de deratizare reprezinta un complex de masuri aplicate de toti factorii interesati pentru reducerea substantiala a populatiei de soareci si sobolani si mentinerii acestora la un nivel numeric redus”.'),
(56, 3, 'Dezinsectie', 162, 'Prin servicii de dezinsectie se intelege distrugerea insectelor parazite (transmitatoare de boli) aflate în mediul uman sau animal cu ajutorul unui insecticid. Previne si combate boli transmise de artropode ca plosnite ,paianjen, tantar, paduche, purice, capusa etc.'),
(57, 4, 'Injectii', 171, 'Servicii oferite: montarea branulei, injectia intravenoasa,injectia intramusculara, injectia intradermica,\r\ninjectia subcutanata.'),
(58, 4, 'Masurarea parametrilor', 172, 'Servicii oferite: masurarea tensiunii arteriale, masurarea pulsului arterial, masurarea temperaturii, masurarea saturatiei de oxigen, masurarea glicemiei din sangele periferic.'),
(59, 5, 'Urgente Veterinare', 101, 'Echipa noastra de medici de urgenta se concentreaza rapid pe evaluarea starii animalului care are nevoie de ajutor, astfel incat sa se poata institui rapid un tratament. Echipa noastra de urgenta evalueaza, diagnosticheaza si trateaza o serie intreaga de afectiuni medicale: de la infectii minore , pana la traumatisme care pun viata animalului in pericol.'),
(60, 5, 'Medicina Interna', 102, 'In scopul de a avea o imagine cat mai complexa legata de problemele de sanatate ale animalului, medicul internist culege informatii de la client privind istoricul pacientului, observa simptomatologia si consulta animalul, efectueaza examene de laborator si examen ecografic. Medicii internisti sunt instruiti in a diagnostica boli cronice grave. '),
(61, 6, 'Reparatie ', 105, 'Oferim servicii de reparatii a tamplariei pvc si aluminiu,  rezolvam toate problemle aparute la tamplaria cu geam termopan'),
(62, 6, 'Montare accesorii', 106, 'Montam urmatoarele accesorii: Sticla termoizolanta si antifonica, Tamplarie pvc si aluminiu, Jaluzele vertical si orizontale, Rulouri exterioare si transparente, Plase contra insectelor, Glafuri de ferestre (interior / exterior), Feronerie metalica.\r\n'),
(63, 7, 'Service centrale termice', 125, ' In cazul uneor defectiuni majore, asiguram piese de schimb (placi electronice, vane, duze, presostate, robineti ) cat si manopera pentru schimbarea lor lor. Oferim servicii de verificari tehnice periodice pentru centrale termice pe gaz deorece suntem firma autorizata ISCIR. Prin revizia tehnica anuala, te ajutam sa reduci riscurile de inundare, pierdere gaz sau intoxicare cu monoxid de carbon si sa previi defectiunile aferente. '),
(64, 7, 'Montare centrale termice', 128, 'Montam o gama variata de centrale termice electrice si pe gaz. Suntem autorizati si calificati pentru a oferi servicii de executia lucrarii de montaj a centralei termice si a instalatiei conexe.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `angajati`
--
ALTER TABLE `angajati`
  ADD PRIMARY KEY (`Angajat_ID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `CNP` (`CNP`),
  ADD KEY `FOREIGN` (`Departament_ID`);

--
-- Indexes for table `angajati-sarcini`
--
ALTER TABLE `angajati-sarcini`
  ADD KEY `Angajat_ID` (`Angajat_ID`),
  ADD KEY `Sarcina_ID` (`Sarcina_ID`);

--
-- Indexes for table `clienti`
--
ALTER TABLE `clienti`
  ADD PRIMARY KEY (`Client_ID`),
  ADD UNIQUE KEY `CNP` (`CNP`);

--
-- Indexes for table `departamente`
--
ALTER TABLE `departamente`
  ADD PRIMARY KEY (`Departament_ID`),
  ADD UNIQUE KEY `Cod_Departament` (`Cod_Departament`),
  ADD KEY `Manager_ID` (`Manager_ID`);

--
-- Indexes for table `sarcini`
--
ALTER TABLE `sarcini`
  ADD PRIMARY KEY (`Sarcina_ID`),
  ADD KEY `Serviciu_ID` (`Serviciu_ID`);

--
-- Indexes for table `servicii`
--
ALTER TABLE `servicii`
  ADD PRIMARY KEY (`Serviciu_ID`),
  ADD UNIQUE KEY `Cod_Serviciu` (`Cod_Serviciu`),
  ADD KEY `DepartamentID` (`DepartamentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `angajati`
--
ALTER TABLE `angajati`
  MODIFY `Angajat_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clienti`
--
ALTER TABLE `clienti`
  MODIFY `Client_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `departamente`
--
ALTER TABLE `departamente`
  MODIFY `Departament_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `sarcini`
--
ALTER TABLE `sarcini`
  MODIFY `Sarcina_ID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `servicii`
--
ALTER TABLE `servicii`
  MODIFY `Serviciu_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `angajati`
--
ALTER TABLE `angajati`
  ADD CONSTRAINT `FOREIGN` FOREIGN KEY (`Departament_ID`) REFERENCES `departamente` (`Departament_ID`);

--
-- Constraints for table `angajati-sarcini`
--
ALTER TABLE `angajati-sarcini`
  ADD CONSTRAINT `angajati-sarcini_ibfk_1` FOREIGN KEY (`Angajat_ID`) REFERENCES `angajati` (`Angajat_ID`),
  ADD CONSTRAINT `angajati-sarcini_ibfk_2` FOREIGN KEY (`Sarcina_ID`) REFERENCES `sarcini` (`Sarcina_ID`);

--
-- Constraints for table `departamente`
--
ALTER TABLE `departamente`
  ADD CONSTRAINT `departamente_ibfk_1` FOREIGN KEY (`Manager_ID`) REFERENCES `angajati` (`Angajat_ID`);

--
-- Constraints for table `sarcini`
--
ALTER TABLE `sarcini`
  ADD CONSTRAINT `sarcini_ibfk_1` FOREIGN KEY (`Serviciu_ID`) REFERENCES `servicii` (`Serviciu_ID`);

--
-- Constraints for table `servicii`
--
ALTER TABLE `servicii`
  ADD CONSTRAINT `servicii_ibfk_1` FOREIGN KEY (`DepartamentID`) REFERENCES `departamente` (`Departament_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

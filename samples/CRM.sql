CREATE TABLE `authen` (
  `AuthenID` varchar(10) NOT NULL,
  `EmpID` varchar(10) NOT NULL,
  `LoginTime` datetime DEFAULT null,
  `LogOutTime` datetime DEFAULT null,
  `Device` varchar(100) DEFAULT null,
  PRIMARY KEY (`AuthenID`, `EmpID`)
);

CREATE TABLE `bill` (
  `BillID` varchar(20) PRIMARY KEY NOT NULL,
  `EmpID` varchar(10) NOT NULL,
  `BillDate` datetime DEFAULT null,
  `Status` char(1) DEFAULT null,
  `Percent` int DEFAULT null
);

CREATE TABLE `bill_detail` (
  `ProjectID` varchar(10) NOT NULL,
  `BillID` varchar(20) NOT NULL,
  `CusID` varchar(10) NOT NULL,
  `Amount` int DEFAULT null,
  PRIMARY KEY (`ProjectID`, `BillID`, `CusID`)
);

CREATE TABLE `customer` (
  `CusID` varchar(10) PRIMARY KEY NOT NULL,
  `CusName` varchar(100) DEFAULT null,
  `Address` varchar(100) DEFAULT null,
  `Phone` varchar(15) DEFAULT null,
  `TIN` char(20) DEFAULT null,
  `CreateDate` datetime DEFAULT null
);

CREATE TABLE `ticket` (
  `TicketID` varchar(10) PRIMARY KEY,
  `CusID` varchar(10),
  `TypeID` varchar(10),
  `ProjectID` varchar(10),
  `EmpID` varchar(10),
  `Description` varchar(1000),
  `CreateDate` datetime DEFAULT null
);

CREATE TABLE `ticket_type` (
  `TypeID` varchar(10) PRIMARY KEY,
  `type` varchar(100)
);

CREATE TABLE `customer_contact` (
  `ContactID` varchar(10) PRIMARY KEY NOT NULL,
  `CusID` varchar(10) NOT NULL,
  `ContactName` varchar(100) DEFAULT null,
  `Position` varchar(45) DEFAULT null,
  `Phone` varchar(15) DEFAULT null,
  `Email` varchar(100) DEFAULT null
);

CREATE TABLE `employee` (
  `EmpID` varchar(10) PRIMARY KEY NOT NULL,
  `EmpName` varchar(100) DEFAULT null,
  `Address` varchar(100) DEFAULT null,
  `Phone` varchar(11) DEFAULT null,
  `Position` varchar(20) DEFAULT null,
  `Password` char(100) DEFAULT null
);

CREATE TABLE `module` (
  `ModID` varchar(10) PRIMARY KEY NOT NULL,
  `ProjectID` varchar(10) NOT NULL,
  `ModName` varchar(100) DEFAULT null,
  `Status` char(1) DEFAULT null
);

CREATE TABLE `project` (
  `ProjectID` varchar(10) PRIMARY KEY NOT NULL,
  `CusID` varchar(10) NOT NULL,
  `ProjectName` varchar(100) DEFAULT null,
  `BeginTime` datetime DEFAULT null,
  `EndTime` datetime DEFAULT null,
  `Manager` varchar(10) DEFAULT null,
  `TotalAmount` int DEFAULT null
);

CREATE TABLE `project_team_detail` (
  `TeamID` varchar(10) NOT NULL,
  `ProjectID` varchar(10) NOT NULL,
  PRIMARY KEY (`TeamID`, `ProjectID`)
);

CREATE TABLE `question` (
  `QuestionID` varchar(10) PRIMARY KEY NOT NULL,
  `SurID` varchar(10) NOT NULL,
  `QuestionName` varchar(200) DEFAULT null,
  `QTypeID` varchar(10) NOT NULL
);

CREATE TABLE `question_details` (
  `AID` varchar(10) DEFAULT null,
  `Answer` varchar(200) DEFAULT null,
  `QuestionID` varchar(10) NOT NULL
);

CREATE TABLE `question_type` (
  `QTypeID` varchar(10) PRIMARY KEY NOT NULL,
  `QTypeName` varchar(100) DEFAULT null,
  `Des` varchar(200) DEFAULT null
);

CREATE TABLE `survey` (
  `SurveyID` varchar(10) PRIMARY KEY NOT NULL,
  `CusID` varchar(10) NOT NULL,
  `SurveyName` varchar(300) DEFAULT null
);

CREATE TABLE `survey_details` (
  `SurveyID` varchar(10) NOT NULL,
  `QuestionID` varchar(10) NOT NULL,
  `EmpID` varchar(10) NOT NULL,
  `Result` varchar(300) DEFAULT null
);

CREATE TABLE `survey_type` (
  `SurID` varchar(10) PRIMARY KEY NOT NULL,
  `SurName` varchar(100) DEFAULT null,
  `Des` varchar(200) DEFAULT null
);

CREATE TABLE `task` (
  `TaskID` varchar(10) PRIMARY KEY NOT NULL,
  `ModID` varchar(10) NOT NULL,
  `TaskName` varchar(200) DEFAULT null,
  `Status` char(1) DEFAULT null,
  `EmpID` varchar(10) NOT NULL,
  `Color` varchar(10) DEFAULT null,
  `StartDate` datetime DEFAULT null,
  `EndDate` datetime DEFAULT null,
  `Description` varchar(200) DEFAULT null
);

CREATE TABLE `team` (
  `TeamID` varchar(10) PRIMARY KEY NOT NULL,
  `TeamName` varchar(100) DEFAULT null
);

CREATE TABLE `team_details` (
  `EmpID` varchar(10) NOT NULL,
  `TeamID` varchar(10) NOT NULL,
  `Status` char(1) DEFAULT null,
  PRIMARY KEY (`EmpID`, `TeamID`)
);

CREATE INDEX `EmpID` ON `authen` (`EmpID`);

CREATE INDEX `bill_ibfk_1_idx` ON `bill` (`EmpID`);

CREATE INDEX `BillID` ON `bill_detail` (`BillID`);

CREATE INDEX `bill_detailibfk_1` ON `bill_detail` (`CusID`);

CREATE INDEX `ProjectID` ON `module` (`ProjectID`);

CREATE INDEX `CusID` ON `project` (`CusID`);

CREATE INDEX `ProjectID` ON `project_team_detail` (`ProjectID`);

CREATE INDEX `SurID` ON `question` (`SurID`);

CREATE INDEX `QTypeID` ON `question` (`QTypeID`);

CREATE INDEX `QuestionID` ON `question_details` (`QuestionID`);

CREATE INDEX `CusID` ON `survey` (`CusID`);

CREATE INDEX `SurveyID` ON `survey_details` (`SurveyID`);

CREATE INDEX `survey_result_ibfk_2` ON `survey_details` (`QuestionID`);

CREATE INDEX `survey_result_ibfk_3_idx` ON `survey_details` (`Result`);

CREATE INDEX `survey_details_ibfk_3` ON `survey_details` (`EmpID`);

CREATE INDEX `EmpID` ON `task` (`EmpID`);

CREATE INDEX `ModID` ON `task` (`ModID`);

CREATE INDEX `TeamID` ON `team_details` (`TeamID`);

ALTER TABLE `authen` ADD CONSTRAINT `authen_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

ALTER TABLE `bill` ADD CONSTRAINT `bill_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

ALTER TABLE `bill_detail` ADD CONSTRAINT `bill_detail_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`);

ALTER TABLE `bill_detail` ADD CONSTRAINT `bill_detail_ibfk_2` FOREIGN KEY (`BillID`) REFERENCES `bill` (`BillID`);

ALTER TABLE `bill_detail` ADD CONSTRAINT `bill_detailibfk_1` FOREIGN KEY (`CusID`) REFERENCES `customer` (`CusID`);

ALTER TABLE `module` ADD CONSTRAINT `module_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`);

ALTER TABLE `project` ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`CusID`) REFERENCES `customer` (`CusID`);

ALTER TABLE `project_team_detail` ADD CONSTRAINT `project_team_detail_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`);

ALTER TABLE `project_team_detail` ADD CONSTRAINT `project_team_detail_ibfk_2` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`);

ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_1` FOREIGN KEY (`SurID`) REFERENCES `survey_type` (`SurID`);

ALTER TABLE `question` ADD CONSTRAINT `question_ibfk_2` FOREIGN KEY (`QTypeID`) REFERENCES `question_type` (`QTypeID`);

ALTER TABLE `question_details` ADD CONSTRAINT `question_details_ibfk_1` FOREIGN KEY (`QuestionID`) REFERENCES `question` (`QuestionID`);

ALTER TABLE `survey` ADD CONSTRAINT `survey_ibfk_1` FOREIGN KEY (`CusID`) REFERENCES `customer` (`CusID`);

ALTER TABLE `survey_details` ADD CONSTRAINT `survey_details_ibfk_1` FOREIGN KEY (`SurveyID`) REFERENCES `survey` (`SurveyID`);

ALTER TABLE `survey_details` ADD CONSTRAINT `survey_details_ibfk_2` FOREIGN KEY (`QuestionID`) REFERENCES `question` (`QuestionID`);

ALTER TABLE `survey_details` ADD CONSTRAINT `survey_details_ibfk_3` FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

ALTER TABLE `task` ADD CONSTRAINT `task_ibfk_2` FOREIGN KEY (`ModID`) REFERENCES `module` (`ModID`);

ALTER TABLE `team_details` ADD CONSTRAINT `team_details_ibfk_1` FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

ALTER TABLE `team_details` ADD CONSTRAINT `team_details_ibfk_2` FOREIGN KEY (`TeamID`) REFERENCES `team` (`TeamID`);

ALTER TABLE `customer_contact` ADD FOREIGN KEY (`CusID`) REFERENCES `customer` (`CusID`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`TypeID`) REFERENCES `ticket_type` (`TypeID`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`CusID`) REFERENCES `customer` (`CusID`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`ProjectID`) REFERENCES `project` (`ProjectID`);

ALTER TABLE `ticket` ADD FOREIGN KEY (`EmpID`) REFERENCES `employee` (`EmpID`);

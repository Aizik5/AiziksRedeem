USE `essentialmode`;

CREATE TABLE IF NOT EXISTS `codes` (
  `code` varchar(24) NOT NULL DEFAULT '',
  `type` varchar(50) NOT NULL,
  `amount` int(100) NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
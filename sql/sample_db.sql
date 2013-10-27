SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

DROP SCHEMA IF EXISTS `luft` ;
CREATE SCHEMA IF NOT EXISTS `luft` ;

USE `luft` ;

-- -----------------------------------------------------
-- Table `luft`.`site_users`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `luft`.`site_users` (
  `id` INT NOT NULL AUTO_INCREMENT ,
  `luft_id` VARCHAR(256) NULL ,
  `name` VARCHAR(200) NULL ,
  `login_count` INT NOT NULL DEFAULT 0 ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `luft`.`tokens`
-- -----------------------------------------------------
CREATE  TABLE IF NOT EXISTS `luft`.`tokens` (
  `id` VARCHAR(128) NOT NULL ,
  `action` VARCHAR(20) NULL ,
  `user_id` VARCHAR(256) NULL ,
  PRIMARY KEY (`id`) )
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

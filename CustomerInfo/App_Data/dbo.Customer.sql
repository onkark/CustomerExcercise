
CREATE TABLE [dbo].[Customer] (
    [Id]         INT          IDENTITY (1, 1) NOT NULL,
    [FirstName]  VARCHAR (50) NOT NULL,
    [LastName]   VARCHAR (50) NULL,
    [Gender]     VARCHAR (10) NOT NULL,
    [Title]      VARCHAR (10) NULL,
	Mobile		 varchar(100) null,
	Email		 varchar(100) null,
	Country		 varchar(100) default ('USA'),
	[State]		 varchar(100) default ('NC'),
	[City]		 varchar(100) default ('Charlotte'),
	[Zip]		 varchar(10) default ('28211'),
    [SSN]        VARCHAR (12) NULL,
    [ModifiedOn] DATE         DEFAULT (getdate()) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);



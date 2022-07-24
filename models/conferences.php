<?php

namespace app\models;

use PDO;

class Conference
{

    // Connection
    private object $conn;

    // Table
    private string $db_table = "Conferences";

    // Columns
    public int $id;
    public string $title;
    public string $country;
    public string $address;
    public string $date;

    // Db connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // GET ALL
    public function getConferences()
    {
        $sqlQuery = "SELECT id, title, country, address, date FROM " . $this->db_table . "";
        $stmt = $this->conn->prepare($sqlQuery);
        $stmt->execute();
        return $stmt;
    }

    // CREATE
    public function createConference()
    {
        $sqlQuery = "INSERT INTO
                        " . $this->db_table . "
                    SET
                        title = :title, 
                        country = :country, 
                        address= :address, 
                        date = :date"; 

        $stmt = $this->conn->prepare($sqlQuery);

        // sanitize
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->date = htmlspecialchars(strip_tags($this->date));

        // bind data
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":date", $this->date);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // UPDATE
    public function getSingleConference()
    {
        $sqlQuery = "SELECT
                        id, 
                        title,
                        country,
                        address,
                        date
                      FROM
                        " . $this->db_table . "
                    WHERE 
                       id = ?
                    LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->title = $dataRow['title'];
        $this->country = $dataRow['country'];
        $this->address = $dataRow['address'];
        $this->date = $dataRow['date'];
    }

    // UPDATE
    public function updateConference()
    {
        $sqlQuery = "UPDATE
                        " . $this->db_table . "
                    SET
                         title = :title,
                        country = :country,
                        address= :address,
                        date = :date
                    WHERE 
                        id = :id";

        $stmt = $this->conn->prepare($sqlQuery);

	$this->title = htmlspecialchars(strip_tags($this->title));
        $this->country = htmlspecialchars(strip_tags($this->country));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->id = htmlspecialchars(strip_tags($this->id));

        // bind data
        
        
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":country", $this->country);
        $stmt->bindParam(":address", $this->address);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":id", $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    // DELETE
    function deleteConference()
    {
        $sqlQuery = "DELETE FROM " . $this->db_table . " WHERE id = ?";
        $stmt = $this->conn->prepare($sqlQuery);

        $this->id = htmlspecialchars(strip_tags($this->id));

        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

}

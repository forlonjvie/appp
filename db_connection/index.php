<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Send Guest Confirmation Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 50px;
      background-color: #f4f4f4;
    }
    .container {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      margin: 0 auto;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    h2 {
      text-align: center;
    }
    label {
      display: block;
      margin-top: 10px;
    }
    input[type="text"], input[type="email"] {
      width: 100%;
      padding: 8px;
      margin: 5px 0;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 15px;
    }
    button:hover {
      background-color: #218838;
    }
  </style>
</head>
<body>

<div class="container">
  <h2>Send Guest Confirmation Email</h2>
  <form action="sample.php" method="POST">
    <label for="guestName">Guest Name:</label>
    <input type="text" id="guestName" name="guestName" required>
    
    <label for="guestEmail">Guest Email:</label>
    <input type="email" id="guestEmail" name="guestEmail" required>

    <label for="hoName">Home Owner Name:</label>
    <input type="text" id="hoName" name="hoName" required>

    <label for="hoHousenum">House Number:</label>
    <input type="text" id="hoHousenum" name="hoHousenum" required>

    <button type="submit">Send Confirmation Email</button>
  </form>
</div>

</body>
</html>

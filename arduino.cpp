const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(sensorPin, INPUT);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  float voltage = sensorValue * (5.0 / 1023.0);
  float humidity = (voltage - 0.8) * (100.0 / (3.0 - 0.8));
  humidity = constrain(humidity, 0, 100);

  String json = "{\"sensor\":\"humidity\",\"value\":" + String(humidity, 1) + "}";
  Serial.println(json);

  delay(1000);
}
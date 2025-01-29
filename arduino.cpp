const int sensorPin = A0;

void setup() {
  Serial.begin(9600);
  pinMode(sensorPin, INPUT);
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  float humidity = map(sensorValue, 0, 1023, 0, 100);

  String json = "{\"sensor\":\"humidity\",\"value\":" + String(humidity, 1) + "}";
  Serial.println(json);

  delay(1000);
}
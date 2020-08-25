void setup()
{
  Serial.begin(9600);
    pinMode(5,OUTPUT);
}
void loop()
{
  while(!Serial.available());  //wait until a byte was received
  digitalWrite(5, Serial.read());//output received byte

}

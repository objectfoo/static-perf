# json webtokens

## delegated authorization

upstream service that validates user then assembles
session data into a json object, serialzies it then
encrypts using a private key.

downstream consumers can validate the payload using
public key without having to do a service call



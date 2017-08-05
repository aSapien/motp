# MOTP
## My One-Time-Passwords [![CircleCI](https://circleci.com/gh/sapiend/motp.svg?style=shield)](https://circleci.com/gh/sapiend/motp)

### An OTP manager written on Node.


I got tired of pulling out my phone every time I need an OTP. So I created this helper app to be able to generate an OTP for every service I need, from the command line on my mac without ever leaving the keyboard.

## Installation 
```sh
npm i -g motp
```

## Usage
1. Scan QR and get the current OTP output to terminal.
```sh
motp /path/to/qr/image.ext
```
2. Just get the code output to terminal.
```sh
motp /path/to/qr/image.ext
```

## ToDo
- Persist to DB
- Make runnable on boot => Assign keyboard shortcuts to generate and paste OTP.
- Wrap with UI interface (Thoughts: Electron ?)

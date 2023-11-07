# stormtrack

Welcome to the project repository for Stormtrack! Stormtrack is a simple project I made to keep track of the rainfall in my area and run an action on the device depending on the rainfall amount.

## Motivation

I live in an old flat in [one of the most active lightning spots in the world](https://www.statista.com/statistics/1292520/global-leading-countries-by-total-lightning-density/), so the power in the house goes out quite often during storms. Most of the appliances are fine, but I've had a few encounters of microSD cards in my Raspberry Pi getting corrupted because of that. I wanted to make a simple project that would allow me to shut down the Pi when it detects rain.

With that said, this project is custom-built to suit my needs, so it might not be useful to you unless you do some additional configuration. Certain assumptions and tweaks made include:

- The fact that nothing more needs to be done after shutting down. If you want to do something else or overwrite the shutdown code entirely, you'll have to modify the code. The `run_action()` method is where you'll want to look.
- The code calculates a weighted average of the rainfall over four weather stations in the area. If you want to use a different weather station or adjust the weights, you'll have to modify the code. The `stations` variable is where you'll want to look.
- Additional configuration needs to be done to make this run automatically. In particular, the task of automating the running of the script should be handled by you. No code is provided for this.
- Because shutting down is a sensitive operation, `sudo` is needed. Since `sudo` is being invoked through this script, you'll need to configure your system to allow the script to run `sudo` without a password. This is not recommended for security reasons, so you'll have to decide if you want to do this.
- Currently, there's the assumption that rainfall implies a storm. This is not always the case, so you'll have to decide if you want to use this script as-is or modify it to suit your needs. Future versions of this script might use other sources, like the [NASA Global Precipitation Measurement](https://pmm.nasa.gov/data-access/downloads/gpm) data to determine if there's a storm.

## Getting started

1. Clone the repository to the device you want to run the script on.

   ```sh
   git clone https://github.com/arashnrim/stormtrack
   ```

2. Install the dependencies.

   ```sh
   pip install -r requirements.txt
   ```

3. Run the script.

   ```sh
   python3 main.py
   ```

### Automating the script

Keep in mind that the script only runs once and then exits. You'll need to automate the running of the script yourself. You can do this by using a cron job. For example:

1. Open the crontab file.

   ```sh
   crontab -e
   ```

2. Add the following line to the file.

   ```sh
   */10 * * * * python3 /path/to/stormtrack/main.py
   ```

   This will run the script every 10 minutes. You can change the frequency by changing the first few values. Use a [cron calculator](https://crontab.guru/) to help you with this. You can also change the path to the script if you cloned the repository to a different location.

### The `stations-view` directory

For convenience, if you need to refer to the stations available, `stations-view` is a basic vanilla webpage that displays the stations and their IDs. You can open it by opening the `index.html` file in your browser. A Mapbox API key is required for the map to work. You can get one [here](https://account.mapbox.com/access-tokens/).

## Contributions

Since this is a personal project, I don't expect any contributions. However, if you do want to contribute, feel free to open a pull request. I'll review it and merge it if it's good. Thank you for your interest!

## Licence

This project is licensed under the [MIT License](https://github.com/arashnrim/stormtrack/blob/main/LICENSE.md). You are allowed to use, modify, and distribute the code as long as you include the original license and attribution, but there is no warranty of any kind. See the license linked above for more details.

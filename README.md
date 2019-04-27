# advancedTitleBar
A plugin for powercord that allows you to set your own shortcuts on discords titlebar (windows only)

This plugin works together with titleBarGames. But may also be used independently.

It also also you to limit the amount of games displayed by titleBarGames.

# How to use
Simply put *absolute* paths into the Programs section of the settings
and give them an Image URL in the Images section (first path pairs with first image etc.)
Then hit save to confirm and watch it do magic.
![](https://mrlar.dev/i/tJJTW1MRoZnrwDI.png)

# Previews
With titleBarGames enabled.
![](https://mrlar.dev/i/5sReuSKALjMtntp.png)

Without titleBarGames enabled.
![](https://mrlar.dev/i/e1GEfmaYnpEbg6r.png)

# Known issues
Disabling titleBarGames also makes advancedTitleBar vanish until you restart.
This is due to the fact that optional Dependencies are not handled by powercord yet
and the plugin doesn't get reloaded.

The plugin or your discord client may break if you enable the previously disabled titleBarGames
once again due to not being handled.

(Currently there is no way to disable/enable plugins other than with the Dev console.
Be ready to reload after you enable/disable titleBarGames in conjunction with this.)


## Credit

Code may or may not be inspired/partially taken from titleBarGames.

[Bowser is cute](https://codesandbox.io/s/nnw5w5y3l4)

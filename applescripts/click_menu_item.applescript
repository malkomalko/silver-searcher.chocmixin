on run argv
  tell application "System Events" to set focusedAppID to bundle identifier of first application process whose frontmost is true
  tell application "Chocolat" to activate
  tell application "System Events"
    if length of argv is 2 then
      set arg1 to (item 1 of argv as string)
      set arg2 to (item 2 of argv as string)
      perform action "AXPress" of menu item arg2 of menu arg1 of menu bar item arg1 of menu bar 1 of application process "Chocolat"
    end if
    if length of argv is 3 then
      set arg1 to (item 1 of argv as string)
      set arg2 to (item 2 of argv as string)
      set arg3 to (item 3 of argv as string)
      perform action "AXPress" of menu item arg3 of menu arg2 of menu item arg2 of menu arg1 of menu bar item arg1 of menu bar 1 of application process "Chocolat"
    end if
  end tell
  tell application id focusedAppID to activate
end run
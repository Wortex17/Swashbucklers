## Trial Notation
An example for a trial expression is the following:

```
    :# power(STR) + distance + 4
```

- The `4` is a *constant* number in that formula, a numerical value that never changes.
- The `+` is an **operation**, summing together the values on its sides. It obeys the same rules as in math!
- The `distance` here is a *variable*. This variable is always explained in the context of the trial
(inside the text somewhere around the depiction of the expression).
- The power() part, is a test that may yield different results, every time a character tries to pass this trial,
as it depends on the throw of dices and attributes of the characters. More about tests later.
- The `#` tells us that the trial results in a numerical value, that will be used in some context (e.g. as damage).
- A trial expression always begins with the result type of the trial.
The current only other result type is boolean, which is notated as a question mark:
```
    :? chance(DEX)
```
- The `:` is the beginning of the trial expression.

The game avoids to use very complex expressions, so don’t worry too much about that.
But we still have to look inside the special operations.
They will a lot of sense once you dive into the game.
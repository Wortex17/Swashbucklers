# Standard Trials and Tests

## About Trials
A trial describes a character's action or interaction with variable outcome.
Examples are attacking, picking a lock, trying to run, persuading other characters and casting magical spells can be described as trials.
All Trials can be broken down to a set of standard tests and some “operations”, not unlike mathematical operations, that combine them.
The result of a trial can either be numeric, with a value, or boolean, with a state of success or failure.
Trials are notated as terms similar to expressions in mathematics or informatics - but don’t worry, it will not be that hard!

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



## Operations

# `+`
Addition. Same as mathematics! Isn’t this nice?

# -
Subtraction. Same as mathematics! Isn’t this also nice?
This also includes the priority before +.
Beware that negative numbers are possible, and that these are not the same as a subtraction operation - mind the space before and after the operation sign.
*
A multiplication. Yes, you guessed it: Same as mathematics!
This also includes the priority before + and -.
/
A division. No we’re not shitting you - Same as mathematics.
This also includes the priority before +, -, .
But divisions can quite easily become quite complex, so you will not find a lot of these and most of the time it will be very easy stuff like division by two (taking the half of the value before it).
As a rule of thumbs, resulting fractional numbers are rounded down, if not stated otherwise.
( ) 
Brackets. These give priority to the term enclosed within. Same as in mathematics.
Heads up! - tests also use brackets to describe some relationships. These are not the same - again mind the spaces before and after normal brackets (there are none on the ones that the tests are using).
|( )|
A numerical value will be placed inside that piped brackets. If it is negative, make it non-negative. 
Max( , )
Two (or more) numerical values will be placed in these brackets, separated by commas. Only the higher value counts.
Min( , )
Two (or more) numerical values will be placed in these brackets, separated by commas. Only the higher value counts.


>
“Greater than”
Now we’re getting into boolean logic - cool huh?
Before and after this sign two numerical values will be placed. If the first one is higher/greater than the second, this term results as “Success”. Otherwise as “Failure”.
>=
“Greater than or equal”
Same as before, but if both values are equal this term results as “Success”.
<
“Smaller than”
Now we’re getting into boolean logic - cool huh?
Before and after this sign two numerical values will be placed. If the first one is lower/smaller than the second, this term results as “Success”. Otherwise as “Failure”.
<=
“Smaller than or equal”
Same as before, but if both values are equal this term results as “Success”.
==
“Equal”
Before and after this sign two values will be placed. If they are equal, this term results as “Success”. Otherwise as “Failure”.
!=
“Unequal”
Before and after this sign two values will be placed. If they are not equal, this term results as “Success”. Otherwise as “Failure”.
!()
“Inverse”
A boolean value will be placed inside these brackets. If it is a success this term results as “Failure”. Otherwise as “Success”.



All( , )
Two (or more) boolean values will be placed in these brackets, separated by commas.
If all are a success, the whole thing is a success.
Example:
    :? chance(DEX) && chance(STR)
The trial will be successful if both tests are successful.
Any( , )
Two (or more) boolean values will be placed in these brackets, separated by commas.
If any of these is a success, the whole thing is a success.
Example:
    :? Any(chance(DEX), chance(STR))
The trial will be successful if either test is successful. Actually, try the first one, if it is a success, you don’t even need to try the other ones.
When tests have to be passed, you may choose the order in which you want to try them.
(You can either make the test on DEX first or the one on STR).
One( , )
Ok this one seems similar to “Any” but is a bit more tricky.
Two (or more) boolean values will be placed in these brackets, separated by commas.
You have to choose one of them beforehand, and try to pass it. This operator will return the result of that test.
In other words, it means “Choose any of that tests and pass it”.

Example:
    :? One( chance(DEX), chance(STR) )
You can either try the test on DEX or the one on STR.

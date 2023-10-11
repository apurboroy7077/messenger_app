let usernames = [];
let passwords = {};
let messages = [];
let current_user;

let chat_database = localStorage.getItem("chat_database");
if (chat_database == null) {
  chat_database = [usernames, passwords, messages, current_user];
  chat_database = JSON.stringify(chat_database);
  localStorage.setItem("chat_database", chat_database);
} else {
  chat_database = JSON.parse(chat_database);
  usernames = chat_database[0];
  passwords = chat_database[1];
  messages = chat_database[2];
  current_user = chat_database[3];
}
let save_to_localstorage = () => {
  let chat_database = [usernames, passwords, messages, current_user];
  chat_database = JSON.stringify(chat_database);
  localStorage.setItem("chat_database", chat_database);
};

let container = document.getElementsByClassName("container")[0];
container.addEventListener("click", () => {
  save_to_localstorage();
  update_everything();
  modifying_inbox_list();
  inbox_page_name_button();
  updating_messages();
  adding_beauty_to_message_list();
  visibility_of_logout_button();
  username_display_update();
});
let create_account_button_function = () => {
  let button = document.getElementsByClassName("create_one")[0];
  button.addEventListener("click", () => {
    let create_account_page = document.getElementsByClassName(
      "create_account_page"
    )[0];
    create_account_page.classList.remove("inactive");
    let login_page = document.getElementsByClassName("login_page")[0];
    login_page.classList.add("inactive");
  });
};
create_account_button_function();
let function_of_back_button_in_the_specific_person_inbox = () => {
  let button = document.getElementsByClassName(
    "back_button_of_inbox_of_specific_person"
  )[0];
  button.addEventListener("click", () => {
    let inbox_page = document.getElementsByClassName("inbox_page")[0];
    inbox_page.classList.remove("inactive");
    let inbox_div = document.getElementsByClassName(
      "inbox_of_specific_person"
    )[0];
    inbox_div.classList.add("inactive");
  });
};
function_of_back_button_in_the_specific_person_inbox();
let function_of_inbox_page_back_button = () => {
  let button = document.getElementsByClassName("inbox_page_back_button")[0];
  button.addEventListener("click", () => {
    let message_page = document.getElementsByClassName("message_page")[0];
    let inbox_page = document.getElementsByClassName("inbox_page")[0];
    inbox_page.classList.add("inactive");
    message_page.classList.remove("inactive");
  });
};
function_of_inbox_page_back_button();
let function_of_login_submit_button = () => {
  let button = document.getElementsByClassName("submit_button")[0];
  button.addEventListener("click", () => {});
};
function_of_login_submit_button();
let function_of_create_account_submit_button = () => {
  let button = document.getElementsByClassName(
    "create_account_submit_button"
  )[0];
  button.addEventListener("click", () => {
    let username = document.getElementsByClassName(
      "create_account_username_input"
    )[0].value;
    let password = document.getElementsByClassName(
      "create_account_password_input"
    )[0].value;
    let confirm_password = document.getElementsByClassName(
      "create_account_confirm_password_input"
    )[0].value;
    if (
      password == confirm_password &&
      password.length > 6 &&
      check_username(username) == true
    ) {
      show_message("Create Account Successful");
      usernames.push(username);
      passwords[username] = password;
      login_confirmed(username);
      create_account_to_message_page();
    } else {
      let message = check_username(username);
      if (message != true) {
        show_message(message);
      } else if (password.length < 6) {
        show_message("Password is too Short");
      } else if (password != confirm_password) {
        show_message("Please Confirm Password Correctly");
      }
    }
  });
};
function_of_create_account_submit_button();
let check_username = (username) => {
  if (username.includes(" ")) {
    return "White Space Not Allowed";
  }
  let matched = 0;
  for (let i = 0; i < usernames.length; i++) {
    let saved_username = usernames[i];
    if (username == saved_username) {
      matched++;
    }
  }
  if (matched == 0) {
    return true;
  } else {
    return "Username Taken";
  }
};
let show_message = (message) => {
  let box = document.getElementsByClassName("program_message")[0];
  box.innerHTML = message;
  setTimeout(() => {
    box.innerHTML = "";
  }, 3000);
};
let create_account_to_message_page = () => {
  let this_page = document.getElementsByClassName("create_account_page")[0];
  let message_page = document.getElementsByClassName("message_page")[0];
  message_page.classList.remove("inactive");
  this_page.classList.add("inactive");
};
let login_page_submit_button_function = () => {
  let button = document.getElementsByClassName("submit_button")[0];
  button.addEventListener("click", () => {
    let username = document.getElementsByClassName("username_input")[0].value;
    let password = document.getElementsByClassName("password_input")[0].value;
    let terror_bird = 0;
    for (let i = 0; i < usernames.length; i++) {
      let saved_username = usernames[i];
      if (saved_username == username) {
        if (password == passwords[username]) {
          login_page_to_message_page();
          show_message("Logged in Successful");
          login_confirmed(username);
          terror_bird++;
        }
      }
    }
    if (terror_bird == 0) {
      show_message("Invalid Account");
    }
  });
};
login_page_submit_button_function();
let login_page_to_message_page = () => {
  let this_page = document.getElementsByClassName("login_page")[0];
  let next_page = document.getElementsByClassName("message_page")[0];
  next_page.classList.remove("inactive");
  this_page.classList.add("inactive");
};
let login_confirmed = (username) => {
  current_user = username;
};
let update_everything = () => {
  if (current_user != null) {
    let displayed_username =
      document.getElementsByClassName("displayed_username")[0];
    displayed_username.innerHTML = current_user;
  }
};
let create_message_button_function = () => {
  let button = document.getElementsByClassName("create_message")[0];
  button.addEventListener("click", () => {
    let this_page = document.getElementsByClassName("message_page")[0];
    let next_page = document.getElementsByClassName("create_message_page")[0];
    next_page.classList.remove("inactive");
    this_page.classList.add("inactive");
  });
};
create_message_button_function();
let inbox_button_function = () => {
  let button = document.getElementsByClassName("inbox")[0];
  button.addEventListener("click", () => {
    let this_page = document.getElementsByClassName("message_page")[0];
    let next_page = document.getElementsByClassName("inbox_page")[0];
    next_page.classList.remove("inactive");
    this_page.classList.add("inactive");
  });
};
inbox_button_function();
let function_of_back_button_in_create_message = () => {
  let button = document.getElementsByClassName(
    "create_message_page_back_button"
  )[0];
  button.addEventListener("click", () => {
    let this_page = document.getElementsByClassName("create_message_page")[0];
    let next_page = document.getElementsByClassName("message_page")[0];
    next_page.classList.remove("inactive");
    this_page.classList.add("inactive");
  });
};
function_of_back_button_in_create_message();
let function_of_send_button_in_create_message_page = () => {
  let button = document.getElementsByClassName("send_button")[0];
  button.addEventListener("click", () => {
    let message = document.getElementsByClassName("message_input")[0].value;
    let recipient = document.getElementsByClassName(
      "message_recipient_input"
    )[0].value;
    let message_data = [[current_user], [recipient], [message]];
    messages.push(message_data);
    show_message("Message Sent Successfull");
    let message_box = document.getElementsByClassName("message_input")[0];
    message_box.value = "";
  });
};
function_of_send_button_in_create_message_page();
let modifying_inbox_list = () => {
  let list = document.getElementsByClassName("inbox_list")[0];
  list.innerHTML = "";
  let chat_list = [];
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let message_owner = message[0][0];
    let message_recipient = message[1][0];
    // console.log(message_owner);
    // console.log(current_user);
    if (current_user == message_owner || current_user == message_recipient) {
      if (current_user == message_owner) {
        chat_list.push(message_recipient);
      } else if (current_user == message_recipient) {
        chat_list.push(message_owner);
      }
    }
  }
  chat_list = new Set(chat_list);
  chat_list = [...chat_list];
  for (let i = 0; i < chat_list.length; i++) {
    let chat_name = chat_list[i];
    list.innerHTML =
      list.innerHTML +
      ` <li class="inbox_page_chat_list_name">${chat_name}</li>`;
  }
};
let inbox_page_name_button = () => {
  let buttons = document.getElementsByClassName("inbox_page_chat_list_name");
  buttons = Array.from(buttons);
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i];
    button.addEventListener("click", (event) => {
      let other_person_name = event.currentTarget.innerHTML;
      changing_from_inbox_page_to_specific_person_page();
      let person_name_div = document.getElementsByClassName("person_name")[0];
      person_name_div.innerHTML = other_person_name;
    });
  }
};
let changing_from_inbox_page_to_specific_person_page = () => {
  let this_page = document.getElementsByClassName("inbox_page")[0];
  let next_page = document.getElementsByClassName(
    "inbox_of_specific_person"
  )[0];
  next_page.classList.remove("inactive");
  this_page.classList.add("inactive");
};
let updating_messages = () => {
  let message_list = document.getElementsByClassName("message_list")[0];
  message_list.innerHTML = "";
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    let message_owner = message[0];
    let message_recipient = message[1];
    let message_text = message[2];
    let message_recipient_open =
      document.getElementsByClassName("person_name")[0].innerHTML;
    if (
      (current_user == message_owner &&
        message_recipient == message_recipient_open) ||
      (current_user == message_recipient &&
        message_owner == message_recipient_open)
    ) {
      message_list.innerHTML =
        message_list.innerHTML +
        `<li class="personal_messages ${message_owner}"><div class="">${message_text}</div></li>`;
    }
  }
};
let adding_beauty_to_message_list = () => {
  let personal_messages = document.getElementsByClassName("personal_messages");
  personal_messages = Array.from(personal_messages);
  for (let i = 0; i < personal_messages.length; i++) {
    let message = personal_messages[i];
    if (message.classList.contains(current_user) == true) {
      message.classList.add("go_right");
    }
  }
};
let function_of_send_button_in_personal_message_page = () => {
  let button = document.getElementsByClassName("send_button_of_inbox")[0];
  button.addEventListener("click", () => {
    let message = document.getElementsByClassName(
      "send_message_input_of_inbox"
    )[0].value;
    let recipient = document.getElementsByClassName("person_name")[0].innerHTML;
    let message_data = [[current_user], [recipient], [message]];
    messages.push(message_data);
    show_message("Message Sent Successfull");
  });
};
function_of_send_button_in_personal_message_page();
let visibility_of_logout_button = () => {
  let button = document.getElementsByClassName("logout_button")[0];
  if (current_user == null) {
    button.classList.add("logout_off");
  } else if (button.classList.contains("logout_off")) {
    button.classList.remove("logout_off");
  }
};
visibility_of_logout_button();
let logout_button_function = () => {
  let button = document.getElementsByClassName("logout_button")[0];
  button.addEventListener("click", () => {
    current_user = null;
  });
};
logout_button_function();
let username_display_update = () => {
  let displayed_box = document.getElementsByClassName("displayed_username")[0];
  if (current_user == null) {
    displayed_box.innerHTML = "";
  } else {
    displayed_box.innerHTML = current_user;
  }
};
username_display_update();
let logout_button_click_and_go_to_homepage_function = () => {
  let button = document.getElementsByClassName("logout_button")[0];
  button.addEventListener("click", () => {
    let all_items = document.getElementsByTagName("main")[0].children;
    all_items = Array.from(all_items);
    for (let i = 0; i < all_items.length; i++) {
      let item = all_items[i];
      item.classList.add("inactive");
    }
    let login_page = document.getElementsByClassName("login_page")[0];
    login_page.classList.remove("inactive");
  });
};
logout_button_click_and_go_to_homepage_function();
let if_allready_logged = () => {
  if (current_user != null) {
    let all_pages = document.getElementsByTagName("main")[0].children;
    all_pages = Array.from(all_pages);
    for (let i = 0; i < all_pages.length; i++) {
      let page = all_pages[i];
      page.classList.add("inactive");
    }
    let home_page = document.getElementsByClassName("message_page")[0];
    home_page.classList.remove("inactive");
  }
};
if_allready_logged();

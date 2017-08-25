<?php

include 'DB.php';
$db = new DB();
$tblName = 'users';
$json = file_get_contents('php://input');
$_REQUEST = json_decode($json, true);
if (isset($_REQUEST['action']) && !empty($_REQUEST['action'])) {
    $action = $_REQUEST['action'];
    switch ($action) {
	case "login":

	    $condition['where'] = array('uname' => $_REQUEST['username'], 'password' => $_REQUEST['password']);
	    $condition['return_type'] = 'count';
	    $records = $db->login($tblName, $condition);
	    if ($records) {
		$data['records'] = $records;
		$data['status'] = 'OK';
	    } else {
		$data['records'] = array();
		$data['status'] = 'ERR';
	    }
	    echo json_encode($data);
	    break;
	case "view":
	    $num_rec_per_page = 10;
	    $current_page = (isset($_REQUEST['page']) && !empty($_REQUEST['page']))? $_REQUEST['page']: 1;
//	    $last_page = 
	    $start_from = ($current_page-1) * $num_rec_per_page;
	    $condition['start'] = $start_from;
	    $condition['limit'] = $num_rec_per_page;
	    $records = $db->getRows($tblName, $condition);
	    if ($records) {
		$data['total'] = (int)count($db->getRows($tblName));
		$data['per_page'] = (int)$num_rec_per_page;
		$data['current_page'] = (int)$current_page;
//		$data['last_page'] = (int)$last_page;
		$data['data'] = $records;
		$data['status'] = 'OK';
	    } else {
		$data['records'] = array();
		$data['status'] = 'ERR';
	    }
	    $response = $data;
	    echo json_encode($response);
	    break;
	default:
	    echo '{"status":"INVALID"}';
    }
}